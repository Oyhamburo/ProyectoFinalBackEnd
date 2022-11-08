import { ProductDao,CartDao } from "../../Dao/index.js"

const controller = {};

controller.newCart = async (req, res) => {
    const data = await CartDao.newCart();
    res.status(200).json({
        date: `${data.timestamp}`,
        message: "Ha sido creado un nuevo carrito",
        id: `${data.id}`,
    });
};

controller.deleteCart = async (req, res) => {
    const data = await CartDao.deleteCartById(req.params.id);
    data
        ?
        res.status(200).json({
            message: `El carrito ha sido eliminado`,
            "carrito eliminado": `${req.params.id}`,
        }) :
        res
        .status(404)
        .json({
            message: "El carrito no existe"
        });
};

controller.getProductosInCart = async (req, res) => {
    const data = await CartDao.getCartById(req.params.id);
    if (data === null) {
        res
            .status(200)
            .json({
                error: "Not found",
                message: "No se encontró el carrito"
            });
    } else if (data.productos.length > 0) {
        res.status(200).json({
            message: "Productos del carrito obtenidos",
            "carrito id": data.id,
            productos: data.productos,
        });
    } else {
        res.status(200).json({
            message: "Not found",
            "carrito id": data.id,
            productos: "El carrito no tiene productos",
        });
    }
};

controller.saveProductInCart = async (req, res) => {
    if (req.body.id == null) {
        return res.status(400).send('No se envio el id de producto')
    }
    const productToAdd = await ProductDao.getById(req.body.id);

    if (productToAdd == null) {
        return res.status(404).send('No existe el producto')
    }

    const data = await CartDao.addProductToCart(req.params.id, productToAdd);

    data != null ?
        res.status(200).json({
            message: "Se añadió un producto al carrito",
            "productos in carrito": data,
        }) :
        res.status(404).json({
            error: "No se puede añadir el producto",
            message: "El carrito no existe",
        });
};

controller.deleteProductInCart = async (req, res) => {
    const {
        id,
        id_prod
    } = req.params;
    const data = await CartDao.deleteProductInCartById(id, id_prod);
    console.log(data, "data 63 producto eliminado");
    data != undefined ?
        res.status(200).json({
            message: `Se ha eliminado el producto ${data.title} del carrito ${id}`,
        }) :
        res.status(200).json({
            error: "No existe el producto en el carrito"
        });
};

export { controller as ControllerCart }