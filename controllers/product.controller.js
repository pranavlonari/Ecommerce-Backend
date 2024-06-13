const Product = require("../models/product.model");

exports.createNewProduct = async (req, res) => {
  const { name, description, price, categoryId, quantity } = req.body;

  try {
    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
      quantity,
    });
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({
      message: "Error creating product.",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching products.",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId"
    );
    if (!product) {
      return res.status(404).send({
        message: "Product not found.",
      });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching product.",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price, categoryId, quantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, categoryId, quantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({
      message: "Error updating product.",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    res.status(200).send({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting product.",
    });
  }
};
