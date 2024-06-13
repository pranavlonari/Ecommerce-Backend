const categoryController = require("../controllers/category.controller");
const authMW = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [authMW.verifyToken],
    categoryController.createNewCategory
  );

  app.get(
    "/ecomm/api/v1/categories",
    [authMW.verifyToken],
    categoryController.getAllCategories
  );

  app.get(
    "/ecomm/api/v1/categories/:id",
    [authMW.verifyToken],
    categoryController.getCategoryById
  );

  app.put(
    "/ecomm/api/v1/categories/:id",
    [authMW.verifyToken],
    categoryController.updateCategory
  );

  app.delete(
    "/ecomm/api/v1/categories/:id",
    [authMW.verifyToken],
    categoryController.deleteCategory
  );
};
