import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { pgConnect, syncModels } from "./db.js";
import {
  badRequestErrorHandler,
  forbiddenErrorHandler,
  genericErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandlers.js";
import productsRouter from "./api/product/index.js";
import usersRouter from "./api/user/index.js";
import categoriesRouter from "./api/category/index.js";
import reviewsRouter from "./api/review/index.js";

const server = express();
const port = process.env.PORT || 3001;

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

server.use(express.json());

server.use("/products", productsRouter);
server.use("/users", usersRouter);
server.use("/categories", categoriesRouter);
server.use("/reviews", reviewsRouter)

server.use(badRequestErrorHandler);
server.use(forbiddenErrorHandler);
server.use(genericErrorHandler);
server.use(notFoundErrorHandler);
server.use(unauthorizedErrorHandler);

await pgConnect();
await syncModels();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is listening on port ${port}`);
});
