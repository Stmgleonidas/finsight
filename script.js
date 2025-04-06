/*Footer year js*/
const currentYear = new Date().getFullYear();
document.getElementById("year").textContent = currentYear;

$(document).ready(function () {
    const apiKey = 'cvp8vapr01qve7infed0cvp8vapr01qve7infedg';
    const symbols = [
        "AAPL",   // Apple
        "MSFT",   // Microsoft
        "GOOGL",  // Alphabet (Google)
        "AMZN",   // Amazon
        "NVDA",   // NVIDIA
        "META",   // Meta (Facebook)
        "TSLA",   // Tesla
        "V",      // Visa
        "MA",     // Mastercard
    ];

    const $stockContainer = $('#stock-prices');  // Target the stock section only

    symbols.forEach(function (symbol) {
        $.ajax({
          url: `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
          method: 'GET',
          success: function (data) {
            const changeClass = data.d > 0 ? 'text-success' : 'text-danger';
            const card = `
              <div class="col-md-4">
                <div class="stock-card">
                  <h5>${symbol}</h5>
                  <p>Price: $${data.c.toFixed(2)}</p>
                  <p class="${changeClass}">Change: ${data.d.toFixed(2)} (${data.dp.toFixed(2)}%)</p>
                </div>
              </div>
            `;
            $stockContainer.append(card);  // Append only to stock section
          },
          error: function (xhr, status, error) {
            console.error(`Error fetching ${symbol}:`, error);
          }
        });
    });

    // For Crypto
    const cryptoSymbols = [
        "bitcoin",    // Bitcoin (BTC)
        "ethereum",   // Ethereum (ETH)
        "tether",     // Tether (USDT)
        "binancecoin",// Binance Coin (BNB)
        "usd-coin",   // USD Coin (USDC)
        "cardano"     // Cardano (ADA) - New addition
    ];

    const $cryptoContainer = $('#crypto-prices');  // Target the crypto section only

    $.ajax({
        url: `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin,usd-coin,cardano&vs_currencies=usd&include_24hr_change=true`,
        method: 'GET',
        success: function (data) {
            cryptoSymbols.forEach(function (symbol) {
                const price = data[symbol]?.usd;
                const change = data[symbol]?.usd_24h_change;  // 24h change percentage
                const changeClass = change > 0 ? 'text-success' : 'text-danger';

                if (price) {
                    const card = `
                    <div class="col-md-4">
                        <div class="crypto-card">
                            <h5>${symbol.charAt(0).toUpperCase() + symbol.slice(1)}</h5>
                            <p>Price: $${price.toFixed(2)}</p>
                            <p class="${changeClass}">Change: ${change.toFixed(2)}%</p>
                        </div>
                    </div>
                    `;
                    $cryptoContainer.append(card);  // Append only to crypto section
                }
            });
        },
        error: function (xhr, status, error) {
        console.error('Error fetching crypto data:', error);
        }
    });
});
