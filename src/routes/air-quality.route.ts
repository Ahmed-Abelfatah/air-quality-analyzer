import { Router } from "express";
import {
  getTimeSeriesData,
  getDataByDateRange,
  getDataByParameterAndDateRange,
} from "../controllers/air-quality.controller";

const router = Router();

router.get("/timeseries/:parameter", getTimeSeriesData);
router.get("/range", getDataByDateRange);
router.get("/filter/:parameter", getDataByParameterAndDateRange);

export default router;
