import { FinanceCalculator, ItemValidator, OrderManagment, PriceValidator, MaxPriceValidator, Validator } from "app";
import logger from "./util/logger";
import { readCsv } from "./util/parser";

// ---- Assignment-1 functionality (CSV reading) ----
async function runCsvExample() {
  try {
    const data = await readCsv("data/input.csv");
    logger.info("CSV Data:", data);
  } catch (error) {
    logger.error("Error reading CSV:", error);
  }
}

// ---- Main branch functionality (Order system) ----
const orders = [
  { id: 1, item: "Sponge", price: 15 },
  { id: 2, item: "Chocolate", price: 20 },
  { id: 3, item: "Fruit", price: 18 },
  { id: 4, item: "Red Velvet", price: 25 },
  { id: 5, item: "Coffee", price: 8 },
];

const rules = [
  new ItemValidator(),
  new PriceValidator(),
  new MaxPriceValidator()
];

const orderManager = new OrderManagment(new Validator([]), new FinanceCalculator());

for (const order of orders) {
  orderManager.addOrder(order.item, order.price);
}

// Adding a new order directly
const newItem = "Marble";
const newPrice = 22;
orderManager.addOrder(newItem, newPrice);

console.log("Orders after adding a new order:", orderManager.getOrders());
console.log("Total Revenue:", orderManager.getTotalRevenue());
console.log("Average Buy Power:", orderManager.getAverageBuyPower());

const fetchId = 2;
console.log("Order with ID 2:", orderManager.getOrder(fetchId));

const nonExistentId = 10;
console.log("Order with ID 10 (non-existent):", orderManager.getOrder(nonExistentId));

// Run CSV example
runCsvExample();

