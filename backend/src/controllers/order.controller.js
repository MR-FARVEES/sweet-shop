import Order from "../models/order.model.js";
import Inventory from "../models/inventory.model.js";
import mongoose from "mongoose";

// Create a new order
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { customer, items } = req.body;

    //validate item stock and calculate amounts
    let totalAmount = 0;
    let orderItems = [];

    //Helper function to validate and update inventory
    const validateAndUpdateInventory = async (item) => {
      const inventoryItem = await Inventory.findById(item.item).session(
        session
      );

      if (!inventoryItem)
        throw new Error(`Inventory item not found: ${item.item}`);

      if (inventoryItem.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${inventoryItem.name}. Available: ${inventoryItem.quantity}, Requested: ${item.quantity}`,
        });
      }

      // Calculate total amount for the item
      const totalPrice = item.quantity * inventoryItem.price;
      totalAmount += totalPrice;

      orderItems.push({
        item: item.item,
        quantity: item.quantity,
        price: inventoryItem.price,
        totalPrice: totalPrice,
      });

      // Update inventory quantity
      inventoryItem.quantity -= item.quantity;
      await inventoryItem.save({ session });
    };

    // Loop through items
    for (const item of items) {
      await validateAndUpdateInventory(item);
    }

    // Create new order
    const newOrder = new Order({
      customer,
      items: orderItems,
      totalAmount,
    });

    await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate("customer")
      .populate("items.item");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer, 'name")
      .populate("items.item, 'name")
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("customer");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Cancel order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).populate("items.item");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update inventory quantities back to original
    for (const item of order.items) {
      const inventoryItem = await Inventory.findById(item.item);
      if (inventoryItem) {
        inventoryItem.quantity += item.quantity;
        await inventoryItem.save();
      }
    }

    // Cancel the order
    order.status = "Cancelled";
    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get orders by customer ID
const getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.customerId })
      .populate("items.item", "name")
      .sort("-createdAt");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order statistics
const getOrderStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Daily statistics
    const dailyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "cancelled" },
    });

    const dailySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lte: endOfDay },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Monthly statistics
    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      status: { $ne: "cancelled" },
    });

    const monthlySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
          status: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    // Total statistics
    const totalOrders = await Order.countDocuments({
      status: { $ne: "cancelled" },
    });

    const totalSales = await Order.aggregate([
      {
        $match: { status: { $ne: "cancelled" } },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.json({
      daily: {
        orders: dailyOrders,
        sales: dailySales.length > 0 ? dailySales[0].total : 0,
      },
      monthly: {
        orders: monthlyOrders,
        sales: monthlySales.length > 0 ? monthlySales[0].total : 0,
      },
      total: {
        orders: totalOrders,
        sales: totalSales.length > 0 ? totalSales[0].total : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrdersByCustomer,
  getOrderStats,
};
