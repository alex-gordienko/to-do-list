import { Router } from "express";
import { format } from "date-fns";

export default () => {
  const router = Router();
  router.get("/api/health", (req, res) => {
    const now = new Date();
    res.json({
      status: "ok",
      date: format(now, "yyyy-MM-dd HH:mm:ss"),
    });
  });
  return router;
};
