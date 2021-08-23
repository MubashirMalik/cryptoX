var webSockets = []
let lastPrices = []

for(let i = 0; i < symbols.length; i++) {
    webSockets.push(new WebSocket("wss://stream.binance.com:9443/ws/"+ symbols[i] + "usdt@trade"));
    tradeMessageHandler(webSockets[i], symbols[i], i);
}

for(let i = 0; i < symbols.length; i++) {
    webSockets.push(new WebSocket("wss://stream.binance.com:9443/ws/"+ symbols[i] + "usdt@miniTicker"));
    markPriceMessageHandler(webSockets[i + (symbols.length)], symbols[i], lastPrices[i]);
}

function tradeMessageHandler(webSocket, symbol, i) {
    let lastPrice = null;
    webSocket.onmessage = (event) => {
        let stockPriceElement = document.getElementById(symbol);
        let stockObject = JSON.parse(event.data);

        let price = parseFloat(stockObject.p);
        price > 1000 ? price = price.toFixed(0) : price = price.toFixed(4);

        stockPriceElement.innerText = price;
        stockPriceElement.style.color = !lastPrice || lastPrice === price ? 'black' : price > lastPrice ? '#3ab98d' : '#F6465D;'; 
        lastPrice = price;
        lastPrices[i] = price;
    }
}

function markPriceMessageHandler(webSocket, symbol, lastPrice) {
    webSocket.onmessage = (event) => {
        let stockObject = JSON.parse(event.data);
        let hPrice = parseFloat(stockObject.h)
        let lPrice = parseFloat(stockObject.l)

        // Adjust floating points accordingly
        lPrice > 1000 ? lPrice = lPrice.toFixed(0) : lPrice = lPrice.toFixed(4);
        hPrice > 1000 ? hPrice = hPrice.toFixed(0) : hPrice = hPrice.toFixed(4);   

        let stockPriceElement = document.getElementById(symbol + "high");
        stockPriceElement.innerHTML = "24h High: <span style='color: #3ab98d;'>" + hPrice + "</span>";
        stockPriceElement = document.getElementById(symbol + "low");
        stockPriceElement.innerHTML = "24h Low: <span style='color: #F6465D;'>" + lPrice + "</span>";
    }
}