const Item = require('../models/item.model');
// const authSchema = require('../utils/validation');

class ItemController {
  async addSuggestion(req, res) {
    try {
      const { name, description, category, reasons } = req.body;
      // if (
      //   category === 'Electronics' ||
      //   category === 'Furniture' ||
      //   category === 'Grocery'
      // )
      //   return res.status(400).json({
      //     status: 'error',
      //     data: {
      //       message: 'The category type can not be added into the cart',
      //     },
      //   });
      console.log({ name, description, category, reasons });
      const item = new Item({
        name,
        description,
        category,
        reasons,
      });
      const saveItem = await item.save();
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Item created successfully',
          data: saveItem,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }

  async getAllItemsByCategorySuggestion(req, res) {
    try {
      const { category } = req.params;
      console.log(category);
      const itemsByCategory = await Item.find({ category });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'successfully retrieve all item by category',
          items: itemsByCategory,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }

  async getAllItemSuggestion(req, res) {
    try {
      const items = await Item.find({});
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Items successfully retrieved',
          items,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        data: {
          message: 'Server Error',
        },
      });
    }
  }
}

module.exports = new ItemController();
