import { Router } from "express";
import { ProductDao } from "../../Dao/index.js"
import { verifyRole } from "../../middlewares/verifyRole.js";
import { DATE_UTILS } from "../../utils/date-utils.js";
import { LOGGER_UTILS } from "../../utils/logger-utils.js";

const router = Router()


// /api/products

router.get('/', async (req, res) => {
    const product = await ProductDao.getAll()
    res.send(product)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const product = await ProductDao.getAll(Number(id))
    res.send(product)
})

// id, timestamp, nombre, descripcion, codigo, foto(url, preecio, stock)
// agregar validate
// router.post('/', verifyRole, async (req, res) => {
    router.post('/', async (req, res) => {
    try {
        
        const { title, description, code, thumbnail, price, stock } = req.body
        
        const product = { title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp() }
        
        const createdProduct = await ProductDao.save(product)
        
        res.send(createdProduct)
    } catch (error) {
        // no se deberia guar logs de inputs de usuario
        // solo errores propios o internos del server
        await LOGGER_UTILS.addLog(error)
        res.send(error)    
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params
        await ProductDao.deleteById(Number(id))
        res.send({ success: true })
    }catch(error){
        console.log(error)
        res.send({error:'Ocurrio un error'})
    }
})

export { router as ProductRouter }