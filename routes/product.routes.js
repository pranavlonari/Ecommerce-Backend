const productController = require("../controllers/product.controller");
const authMW = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/products",
    [authMW.verifyToken],
    productController.createNewProduct
  );

  app.get(
    "/ecomm/api/v1/products",
    [authMW.verifyToken],
    productController.getAllProducts
  );

  app.get(
    "/ecomm/api/v1/products/:id",
    [authMW.verifyToken],
    productController.getProductById
  );

  app.put(
    "/ecomm/api/v1/products/:id",
    [authMW.verifyToken],
    productController.updateProduct
  );

  app.delete(
    "/ecomm/api/v1/products/:id",
    [authMW.verifyToken],
    productController.deleteProduct
  );
};
