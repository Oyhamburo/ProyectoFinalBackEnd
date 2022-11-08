import fs from 'fs'

class Cart {
    constructor(fileName) {;
        this.file = `./src/db/${fileName}.json`
        this.productos = [];
        this.date = new Date().toLocaleString()
    }

    async newCart() {
        try {
            const dataToParse = await fs.promises.readFile(this.file, "utf-8");
            const dataParsed = JSON.parse(dataToParse);
            const newCart = {
                id: dataParsed.length + 1,
                timestamp: this.date,
                productos: this.productos,
                total: 0,
            };
            dataParsed.push(newCart);
            const updatedFile = JSON.stringify(dataParsed, null, " ");
            fs.promises.writeFile(this.file, updatedFile);
            return newCart;
        } catch (error) {
            console.error(`Se produjo un error en newCart:${error}`);
        }
    }

    async deleteCartById(idEntered) {
        try {
            const dataToParse = await fs.promises.readFile(this.file, "utf-8");
            const dataParsed = JSON.parse(dataToParse);
            const leakedCartId = dataParsed.filter(({
                id
            }) => id != idEntered);
            const CartFound = dataParsed.find(({
                id
            }) => id == idEntered);

            if (CartFound) {
                console.log(`Se ha eliminado el Cart con id:${idEntered}`);
                const updatedFile = JSON.stringify(leakedCartId, null, " ");

                fs.promises.writeFile(this.file, updatedFile);
                return CartFound;
            } else {
                console.log(`No se ha encontrado el Cart con id: ${idEntered}`);
            }
        } catch (error) {
            console.error(`Se ha producido un error en deleteCartById: ${error}`);
        }
    }

    async getCartById(idEntered) {

        try {
            const dataToParse = await fs.promises.readFile(this.file, "utf-8");
            const dataParsed = JSON.parse(dataToParse);
            const CartFound = dataParsed.find(({
                id
            }) => id == idEntered);

            if (CartFound) {
                console.log(`Se obtuvo el Cart ${idEntered}`);
                return CartFound;
            } else {
                console.log(`No se ha encontrado el Cart ${idEntered}`);
                return null
            }
        } catch (error) {
            console.error(`Se produjo un error en getCartById: ${error}`);

        }
    }

    async addProductToCart(idEntered, object) {
        try {
            const dataToParse = await fs.promises.readFile(this.file, "utf-8");
            const dataParsed = JSON.parse(dataToParse);
            const leakedCartId = dataParsed.filter(({
                id
            }) => id != idEntered);
            const CartFound = dataParsed.find(({
                id
            }) => id == idEntered);

            if (CartFound) {
                CartFound.productos.push(object);
                CartFound.productos.sort((a, b) => a.id - b.id);
                leakedCartId.push(CartFound);
                leakedCartId.sort((a, b) => a.id - b.id);
                const updatedFile = JSON.stringify(leakedCartId, null, " ");
                fs.promises.writeFile(this.file, updatedFile);
                console.log(
                    `Se ha agregado el producto ${object.title} exitosamente al Cart ${idEntered}`
                );
                return CartFound;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`Se produjo un error en addProductToCart:${error}`);
        }
    }

    async deleteProductInCartById(idCart, idProduct) {
        try {
            const dataToParse = await fs.promises.readFile(this.file, "utf-8");
            const dataParsed = JSON.parse(dataToParse);

            const leakedCarts = dataParsed.filter(({
                id
            }) => id != idCart);
            const CartFound = dataParsed.find(({
                id
            }) => id == idCart);

            const leakedProductos = CartFound.productos.filter(
                ({
                    id
                }) => id != idProduct
            );
            const productFound = CartFound.productos.find(({
                id
            }) => id == idProduct);

            CartFound.productos = leakedProductos;
            CartFound.productos.sort((a, b) => a.id - b.id);
            leakedCarts.push(CartFound);
            leakedCarts.sort((a, b) => a.id - b.id);
            const updatedFile = JSON.stringify(leakedCarts, null, " ");

            fs.promises.writeFile(this.file, updatedFile);

            return productFound;
        } catch (error) {
            console.error(`Se produjo un error en deleteProductInCartById:${error}`);
        }
    }
}

export { Cart as CartModel }