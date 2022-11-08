import { Router } from "express";
import { ControllerProducts } from "../../controllers/index.controller.js";
import { verifyRole } from "../../middlewares/verifyRole.js";

const router = Router()

router.get('/', verifyRole(true),ControllerProducts.getAll)
router.get('/:id',verifyRole(true), ControllerProducts.getById)
router.post("/", verifyRole(true),ControllerProducts.post);
router.put("/:id", verifyRole(true), ControllerProducts.put);
router.delete("/:id", verifyRole(true),ControllerProducts.delete);


export { router as ProductRouter }