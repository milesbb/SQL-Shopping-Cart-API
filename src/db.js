import { Sequelize } from "sequelize";

const { PGDATABASE, PGPASSWORD, PGHOST, PGPORT, PGUSER } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  typeValidation: true,
});

export const pgConnect = async () => {
  try {
    await sequelize.authenticate({ logging: true });
    console.log("Postgres connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true, logging: true });
    console.log("Tables have been synced");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
