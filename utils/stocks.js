const stockList = [
  {
    name: "SBIN",
    price: 300,
    change_percent : 0
  },
  {
    name: "INFY",
    price: 1128,
    change_percent : 0
  },
  {
    name: "HUL",
    price: 13000,
    change_percent : 0
  },
  {
    name: "TATAPOWER",
    price: 85,
    change_percent : 0
  },
];

const updateStockList = (stockName) => {
    let stock = stockList.filter( stock => stock.name === stockName )[0];
    let newVal = (Math.random() * 10);
    if(newVal > 5){
        newVal += stock.price;
    }
    else{
        newVal -= stock.price;
    }
    newVal = Math.abs(newVal);
    let percentageDif = ((newVal - stock.price) / 100);
    stock.price = newVal;
    stock.change_percent = percentageDif;
    return stock;
};

module.exports = {
  stockList,
  updateStockList,
};