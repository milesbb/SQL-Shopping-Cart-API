import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import ProductModel from "../product/model.js";
import UserModel from "../user/model.js";

const ReviewModel = await sequelize.define("review", {
  reviewId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

UserModel.hasMany(ReviewModel, {as: "reviews"});

ProductModel.hasMany(ReviewModel, {as: "reviews"});

ReviewModel.belongsTo(UserModel, {
    foreignKey: "userId",
    as: "user"
});

ReviewModel.belongsTo(ProductModel, {
    foreignKey: "productId",
    as: "product"
})

export default ReviewModel;
