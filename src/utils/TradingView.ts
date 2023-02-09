
export function getTradingView(bgColor: string) {
  return `
  <!DOCTYPE html>
  <html>

  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0">
    <style>
      * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        height: 100%;
        overflow: hidden
      }

      .tradingview-widget-container {
        height: 100vh !important;
        background-color: ${bgColor};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tradingview-widget-copyright {
        display: none;
      }
    </style>
  </head>

  <body>
    <div class="tradingview-widget-container">
      <div id="tradingview_52b00"></div>
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/EURUSD/?exchange=FX"
          rel="noopener" target="_blank"><span class="blue-text">EUR USD chart</span></a> by TradingView</div>
      <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
      <script type="text/javascript">
        new TradingView.widget(
          {
            "width": "100vw",
            "height": "100%",
            "symbol": "FX:EURUSD",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_side_toolbar": false,
            "allow_symbol_change": true,
            "container_id": "tradingview_52b00"
          }
        );
      </script>
    </div>
  </body>

  </html>
  `
}
