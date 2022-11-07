import { ProductDao } from "../../Dao/index.js"
import { verifyRole } from "../../middlewares/verifyRole.js";
import { DATE_UTILS } from "../../utils/date-utils.js";
import { LOGGER_UTILS } from "../../utils/logger-utils.js";

const controller = {}

// DEVUELVO TODOS LOS PRODUCTOS

controller.getAll = async (req, res) => {
    const product = await ProductDao.getAll()
    res.status(200).json(product);
};

//? DEVUELVO UN PRODUCTO SEGÚN SU ID

controller.getById = async (req, res) => {
    const product = await ProductDao.getById(req.params.id);

    //! Si el id generado no coincide con ningún producto, devuelvo null; de lo contrario, envía la información solicitada
    product
        ?
        res.status(200).json(product) :
        res.status(404).json({
            error: "Producto no encontrado"
        });
};

//? RECIBE Y AGREGA UN PRODUCTO, Y LO DEVUELVO CON SU ID ASIGNADO

controller.post = async (req, res) => {
    const newObject = req.body;
    const product = await ProductDao.save(newObject);
    product == null ?
        res.status(500).json({
            message: `[[${newObject.title}]] ya existe en el archivo`
        }) :
        res.status(200).json({
            message: `Se ha agregado el producto ${product.title}`,
            "new product": product,
        });
};

//? RECIBE Y ACTUALIZA UN PRODUCTO SEGÚN SU ID

controller.put = async (req, res) => {
    const {
        id
    } = req.params;
    const newObject = req.body;
    const product = await ProductDao.update(+id, newObject);

    product != null ?
        res.status(200).json({
            message: `Producto ${id} modificado con éxito`,
            "new product": newObject,
        }) :
        res.status(404).json({
            error: "Producto no encontrado"
        });
};

//? ELIMINA UN PRODUCTO SEGÚN SU ID

controller.delete = async (req, res) => {
    const product = await ProductDao.deleteById(req.params.id);
    product
        ?
        res.status(200).send({
            message: `Se ha eliminado el producto`,
            "product deleted": product,
        }) :
        res.status(404).send({
            message: "No se ha encontrado el producto"
        });
};

export { controller as ControllerProducts }