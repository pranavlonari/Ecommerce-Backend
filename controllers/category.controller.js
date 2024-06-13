const Category = require("../models/category.model");

exports.createNewCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await Category.create({ name, description });
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send({
      message: "Error creating category.",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching categories.",
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found.",
      });
    }
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching category.",
    });
  }
};

exports.updateCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return res.status(404).send({
        message: "Category not found.",
      });
    }

    res.status(200).send(category);
  } catch (error) {
    res.status(500).send({
      message: "Error updating category.",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).send({
        message: "Category not found.",
      });
    }

    res.status(200).send({
      message: "Category deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting category.",
    });
  }
};
