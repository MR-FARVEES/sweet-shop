import Inventory from "../models/inventory.model.js";

const createInventory = async (req, res) => {
  try {
    const { name, cost, quantity, price, category, isAvailable } = req.body;
    const newInventory = new Inventory({
      name,
      cost,
      quantity,
      price,
      category,
      isAvailable,
    });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate("category", "name");
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id).populate("category", "name");
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const { name, cost, quantity, price, category, isAvailable } = req.body;

    const inventoryItem = await Inventory.findById(req.params.id);

    if (inventoryItem) {
      inventoryItem.name = name || inventoryItem.name;
      inventoryItem.cost = cost !== undefined ? cost : inventoryItem.cost;
      inventoryItem.quantity =
        quantity !== undefined ? quantity : inventoryItem.quantity;
      inventoryItem.price = price !== undefined ? price : inventoryItem.price;
      inventoryItem.category = category || inventoryItem.category;
      inventoryItem.isAvailable =
        isAvailable !== undefined ? isAvailable : inventoryItem.isAvailable;

      const updatedInventoryItem = await inventoryItem.save();
      res.json(updatedInventoryItem);
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const inventoryItem = await Inventory.findByIdAndDelete(id);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateInventoryQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const inventoryItem = await Inventory.findById(id);

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    inventoryItem.quantity = quantity;
    await inventoryItem.save();

    res.status(200).json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  createInventory,
  getInventory,
  getInventoryById,
  updateInventoryItem,
  deleteInventoryItem,
  updateInventoryQuantity,
};
