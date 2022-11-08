import { ControllerCart } from "../../controllers/index.controller.js";
import { Router } from "express";

const router = Router()

router.post("/", ControllerCart.newCart);
router.delete("/:id", ControllerCart.deleteCart);
router.get("/:id/productos", ControllerCart.getProductosInCart);
router.post("/:id/productos", ControllerCart.saveProductInCart);
router.delete("/:id/productos/:id_prod", ControllerCart.deleteCart);

export { router as CartRouter }