import { Express } from "express";
import health from "./health";
import tasks from "./tasks";

export default (app: Express) => {
  app.use(health());
  app.use(tasks());
};
