import express from "express";
import {
  updateStockAndPrice,
  updateMultipleStocks,
  canFulfillOrder,
  calculateLowestCost,
} from "../controllers/logic";

const router = express.Router();

/**
 *  Update stock quality and price of one apparel code and size
 */

router.put("/update-stock/:code/:size", async (req, res) => {
  const { code, size } = req.params;
  const { price, quantity } = req.body;

  if (await updateStockAndPrice(code, size, price, quantity)) {
    res
      .status(200)
      .json({ status: true, message: "Stock and price updated successfully" });
  } else {
    res
      .status(404)
      .json({ status: false, message: "Apparel or size not found" });
  }
});

/**
 * Simultaneously update stock quality and price of several apparel codes and sizes
 */

router.put("/update-stocks", async (req, res) => {
  const updates = req.body;

  await updateMultipleStocks(updates);
  res
    .status(200)
    .json({ status: true, message: "Stock and price updates completed" });
});

/**
 * Check if a customer order can be fulfilled
 */
router.post("/check-order", async (req, res) => {
  const orders = req.body;
  const canFulfill = await canFulfillOrder(orders);
  res.status(200).json({ status: true, data: canFulfill });
});

/**
 * Calculating the lowest cost for fulfilling an order
 */
router.post("/check-cost", async (req, res) => {
  const orders = req.body;
  const lowestCost = await calculateLowestCost(orders);
  res.status(200).json({ status: true, totalCost: lowestCost });
});

export default router;
