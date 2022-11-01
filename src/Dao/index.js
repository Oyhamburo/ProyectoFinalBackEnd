import { ContaienrFilesystem } from "../Containers/index.js";
// capaz no se importa porq falta el index

const PRODUCTS_FILENAME = "products"

const ProductDao = new ContaienrFilesystem( PRODUCTS_FILENAME )

export {ProductDao}