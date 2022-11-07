import { Router } from "express";
import { ControllerProducts } from "../../controllers/index.controller.js";

const router = Router()

router.get('/', ControllerProducts.getAll)
router.get('/:id', ControllerProducts.getById)
router.post("/", ControllerProducts.post);
router.put("/:id", ControllerProducts.put);
router.delete("/:id", ControllerProducts.delete);


export { router as ProductRouter }