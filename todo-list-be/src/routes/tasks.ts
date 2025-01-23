import { Router } from "express";
import StorageService from "../services/Storage.service";

export default () => {
  const router = Router();
  const storageService = new StorageService();

  router.get("/api/tasks", async (req, res) => {
    const result = await storageService.getTasks();

    res.json(result);
  });

  router.post("/api/tasks", async (req, res) => {
    const { title, color } = req.body;
    const result = await storageService.createTask(title, color);

    res.json(result);
  });

  router.put("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await storageService.updateTaskStatus(parseInt(id), status);

    res.json(result);
  });

  router.put("/api/tasks/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { title, color } = req.body;
    const result = await storageService.editTask(parseInt(id), title, color);

    res.json(result);
  });

  router.delete("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const result = await storageService.deleteTask(parseInt(id));

    res.json(result);
  });

  return router;
};
