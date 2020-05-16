const express = require('express');
const socketIo = require('socket.io');
const { stockList, updateStockList } = require("./utils/stocks");
const app = express();
console.log("__dirname", __dirname);
app.use('/', (req, res) => {   res.sendFile(__dirname + "/public/stock.html"); })


const appInstance = app.listen(4000);
const STOCK_REFRESH_INTERVAL = 3000;

const webSocket = socketIo(appInstance);
webSocket.on('connection' , socket => {
  socket.emit("mainSocketMsg", {
    ...stockList.filter( socket => socket.name ),
  });
});
stockList.forEach(stock => {
    const stockWS = webSocket.of(`/${stock.name}`);
    stockWS.on('connection' , socket => {
      stockUpdateService(socket, stock.name);
      
    });
});

const stockUpdateService = ( socket, stockName ) =>{
  socket.emit("stockUpdateMsg", updateStockList(stockName));
  const stockTickerInterval = setInterval(() => {
    socket.emit("stockUpdateMsg", updateStockList(stockName));
  }, STOCK_REFRESH_INTERVAL);
  socket.on("disconnect", () => clearInterval(stockTickerInterval));
}

console.log("App running");