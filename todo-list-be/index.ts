import express from "express";
import * as cors from 'cors'

import router from "./src/routes";


const initApp = async () => {
  const app = express();

  const port = process.env.PORT || 5002;

  app.use(cors.default());

  app.use(express.json());
  router(app);

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

initApp();