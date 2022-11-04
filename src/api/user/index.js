import express from "express";
import createHttpError from "http-errors";
import { Op } from "sequelize";
import ReviewModel from "../review/model.js";
import UserModel from "./model.js";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const { id } = await UserModel.create(req.body);

    res.status(201).send(id);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const query = {};

    if (req.query.firstName)
      query.firstName = { [Op.iLike]: `%${req.query.firstName}%` };
    if (req.query.lastName)
      query.lastName = { [Op.iLike]: `%${req.query.lastName}%` };
    if (req.query.age) query.age = { [Op.between]: req.query.age.split(",") };

    const users = await UserModel.findAll({
      where: {
        ...query,
      },
      attributes: req.query.attributes ? req.query.attributes.split(",") : {},
      include: ["reviews"]
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await UserModel.findByPk(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      next(createHttpError(404, `user with id ${req.params.userId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await UserModel.update(
      req.body,
      {
        where: { id: req.params.userId },
        returning: true,
      }
    );

    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      next(createHttpError(404, `user with id ${req.params.userId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await UserModel.destroy({
      where: { id: req.params.userId },
    });

    if (numberOfDeletedRows) {
      res.status(204).send();
    } else {
      next(createHttpError(404, `user with id ${req.params.userId} not found`));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId/reviews", async (req, res, next) => {
    try {
      const user = await UsersModel.findByPk(req.params.userId, {
        include: ["reviews"],
      })
      res.send(user)
    } catch (error) {
      next(error)
    }
  })

export default usersRouter;
