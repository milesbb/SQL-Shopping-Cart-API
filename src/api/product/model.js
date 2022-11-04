import { DataTypes } from "sequelize";
import sequelize from "../../db.js";
import CategoriesModel from "../category/model.js";
import ProductsCategoriesModel from "./productsCategoriesModel.js";

const ProductModel = sequelize.define("product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

ProductModel.belongsToMany(CategoriesModel, {
    through: ProductsCategoriesModel,
    foreignKey: {
        name: "productId",
        allowNull: false
    },
})
CategoriesModel.belongsToMany(ProductModel, {
    through: ProductsCategoriesModel,
    foreignKey: {
        name: "categoryId",
        allowNull: false
    }
})

export default ProductModel
