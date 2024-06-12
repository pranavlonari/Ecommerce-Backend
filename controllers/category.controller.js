/**
 * Controller for creating the category
 *
 *
 * POST localhost:500/ecomm/api/v1/categories
 *
 * {
 *
 * "name":"Household",
 * "description":"This will have all the household items"
 *
 * }
 */

const category_model = require("../models/category.model");
exports.createNewCategory = async (req, res) => {
  //read the req body
  //create the category object
  const cat_data = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    //insert into the mongodb
    const category = await category_model.create(cat_data);
    return res.status(201).send(category);
  } catch (err) {
    console.log("error while creating category");
    return res.status(500).send({
      message: "Error while creating the category",
    });
  }
  //return response of the created category
};
