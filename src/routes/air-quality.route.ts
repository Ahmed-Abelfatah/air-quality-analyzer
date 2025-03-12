import { Router } from "express";
import {
  getTimeSeriesData,
  getDataByDateRange,
} from "../controllers/air-quality.controller";

const router = Router();

router.get("/timeseries/:parameter", getTimeSeriesData);
router.get("/range", getDataByDateRange);

export default router;
