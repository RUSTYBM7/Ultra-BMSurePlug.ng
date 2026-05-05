import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import voiceRouter from "./voice";
import seedRouter from "./seed";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use("/voice", voiceRouter);
router.use("/seed", seedRouter);

export default router;
