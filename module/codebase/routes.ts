import { Router } from "express";
import { createRoom, getRoomById, getRoomList } from "./controllers";

const router: Router = Router();

router.route("/").post(createRoom).get(getRoomList);
router.route("/:id").get(getRoomById);

export default router;