import { ContaienrFilesystem, CartModel } from "../Containers/index.js";
// capaz no se importa porq falta el index

const PRODUCTS_FILENAME = "products"
const CARTS_FILENAME = "carts"

const ProductDao = new ContaienrFilesystem( PRODUCTS_FILENAME )
const CartDao = new CartModel( CARTS_FILENAME )

export {ProductDao,CartDao}