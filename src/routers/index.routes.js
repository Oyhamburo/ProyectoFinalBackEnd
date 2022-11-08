import { Router } from "express";
export { ProductRouter } from "./Product/products.routes.js";
export { CartRouter } from "./Cart/cart.routes.js";
import { ControllerIndex } from "../controllers/index.controller.js"; 

const router = Router()

router.get("/", ControllerIndex.index);

export { router as indexRouter}