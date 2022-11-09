import knex from "knex";
class BaseDeDatos {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla;
 
    }
    async save(producto) {
        try {
            return await this.knex.insert(producto).into(this.table)
        } catch (error) {
            return "no se guardar"

        }
    }

    async getById(id) {
        try{
            const producto = this.knex.select('*').from(this.table).where({id})
            if(producto){
                console.log(producto)
                return producto
            }else{
                return "hubo un error"
            }
        }catch(e)
        {
            throw new Error(e)
        }
    }
    async deleteById(id) {

        try {
            return await this.knex.from(this.table).where({id}).del()
        } catch (error) {
            return "error el leer el archivo borrado por id"
        }

    }
    
    async getAll() {
        try {
            return this.knex.select('*').from(this.table)
        } catch (error) {
            return "error al leer el archivo"
        }
    }
    async deleteAll() {
        try {
            fs.promises.writeFile(`${this.archivo}`, JSON.stringify([]))
            console.log('se borro la lista')
        } catch (err) {
            console.error("ocurrio un error", err)
        }
    }

    async updateById(objetoNuevo) {
        const obj = {
            nombre: objetoNuevo.nombre,
            precio: objetoNuevo.precio,
            descripcion: objetoNuevo.descripcion,
            stock: objetoNuevo.stock,
            timestamp: objetoNuevo.timestamp,
            codigo: objetoNuevo.codigo,
            foto: objetoNuevo.foto
        }
        console.log(obj);
        try {            
            return await this.knex.from(this.table).where('id',objetoNuevo.id).update(obj)            
        } catch (error) {
            return "no se encontro el producto a cambiar"
        }

    }
}



export { BaseDeDatos }