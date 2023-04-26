// TradingViewWidget.jsx

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function TradingView() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_26783') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "BSE:SENSEX",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
            studies: ["STD;SMA","STD;MACD","STD;RSI"],
            container_id: "tradingview_26783"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_26783' style={{height:"50vh",borderRadius:"20px"}} />
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/symbols/BSE-SENSEX/" rel="noopener" target="_blank"><span className="blue-text">SENSEX chart</span></a> by TradingView
      </div>
    </div>
  );
}
