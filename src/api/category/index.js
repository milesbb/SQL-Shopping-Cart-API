import express from "express"
import createHttpError from "http-errors"
import CategoriesModel from "./model.js"

const categoriesRouter = express.Router()

categoriesRouter.post("/", async (req, res, next) => {
  try {
    const { categoryId } = await CategoriesModel.create(req.body)
    res.status(201).send({ id: categoryId })
  } catch (error) {
    next(error)
  }
})

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const categories = await CategoriesModel.findAll()

    if (categories) {

        res.send(categories)
    } else {
        next(createHttpError(404, 'No categories found'))
    }
  } catch (error) {
    next(error)
  }
})

export default categoriesRouter