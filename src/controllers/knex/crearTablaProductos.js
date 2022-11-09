import knex from "knex";
import connection from "";

const Knex = knex(connection)
Knex.schema.createTable('productos', tabla => {
    tabla.increments('id')
    tabla.string('nombre')
    tabla.string('precio')
    tabla.string('descripcion')
    tabla.integer('stock')
    tabla.datetime('timestamp')
    tabla.string('codigo')
    tabla.string('foto')
})
.then(()=>{
    console.log("tabla creada");
})
.catch((e)=>{
    console.log("error", e); throw e;
})
.finally(()=>{
    Knex.destroy()
})