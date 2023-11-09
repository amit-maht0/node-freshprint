import fs from "fs/promises";
import { Apparel } from "../models/Apparel";
import { CustomerOrder } from "../models/Order";
import path from "path";
const DATA_FILE = path.resolve(__dirname, "./data.json");

export async function updateStockAndPrice(
  code: string,
  size: string,
  price: number,
  quantity: number
) {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    let apparelData = JSON.parse(data);

    if (apparelData.length > 0) {
      apparelData.forEach((item: any) => {
        if (item.code == code && item.sizes[size]) {
          item.sizes[size].price = price;
          item.sizes[size].quantity = quantity;
        }
      });
      await fs.writeFile(DATA_FILE, JSON.stringify(apparelData, null, 2));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function updateMultipleStocks(updates: any) {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    let apparelData = JSON.parse(data);
    if (apparelData.length > 0 && updates.length > 0) {
      for (let i = 0; i < updates.length; i++) {
        for (let j = 0; j < apparelData.length; j++) {
          if (
            apparelData[j].code === updates[i].code.toLowerCase() &&
            apparelData[j].sizes[updates[i].size]
          ) {
            apparelData[j].sizes[updates[i].size].price = updates[i].price;
            apparelData[j].sizes[updates[i].size].quantity =
              updates[i].quantity;
          }
        }
      }
      await fs.writeFile(DATA_FILE, JSON.stringify(apparelData, null, 2));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export async function canFulfillOrder(orders: any) {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    let apparelData = JSON.parse(data);
    let finalData = [];
    if (apparelData.length > 0 && orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < apparelData.length; j++) {
          if (
            apparelData[j].code === orders[i].code.toLowerCase() &&
            apparelData[j].sizes[orders[i].size] &&
            apparelData[j].sizes[orders[i].size].quantity >= orders[i].quantity
          ) {
            finalData.push({
              code: apparelData[j].code,
              size: orders[i].size,
              quantity: apparelData[j].sizes[orders[i].size].quantity,
              msg: "Can full fill the order",
            });
          }
        }
      }
    }
    return finalData;
  } catch (error) {
    return "Error full filling order";
  }
}

export async function calculateLowestCost(orders: any) {
  try {
    let totalCost = 0;
    const data = await fs.readFile(DATA_FILE, "utf-8");
    let apparelData = JSON.parse(data);
    let finalData = [];
    if (apparelData.length > 0 && orders.length > 0) {
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < apparelData.length; j++) {
          if (
            apparelData[j].code === orders[i].code.toLowerCase() &&
            apparelData[j].sizes[orders[i].size] &&
            apparelData[j].sizes[orders[i].size].quantity >= orders[i].quantity
          ) {
            totalCost +=
              apparelData[j].sizes[orders[i].size].price * orders[i].quantity;
          }
        }
      }
    }
    return totalCost;
  } catch (error) {
    return "Error full filling order";
  }
}
