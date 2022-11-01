import { Router } from "express";
import { ProductDao } from "../../Dao/index.js"
import { DATE_UTILS } from "../../utils/date-utils.js";

const router = Router()


// /api/products

router.get('/', async (req, res) => {
    const product = await ProductDao.getAll()
    res.send(product)
})

// id, timestamp, nombre, descripcion, codigo, foto(url, preecio, stock)
router.post('/', async (req, res) => {
    const { title, description, code, thumbnail, price, stock } = req.body

    const product = { title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp() }

    const createdProduct = await ProductDao.save(product)

    res.send(createdProduct)
})

export { router as ProductRouter }