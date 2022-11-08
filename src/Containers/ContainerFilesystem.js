// import { json } from 'body-parser'
import fs from 'fs'

class ContaienrFilesystem {
    constructor(fileName){
        this.filePath = `./src/db/${fileName}.json`
    }

    async getAll() {
        try{
            const file = await fs.promises.readFile(this.filePath,"utf8")
            const elements = JSON.parse(file)

            return elements
        } catch (error){
            if ( error.code === "ENOENT"){
                await fs.promises.writeFile(this.filePath, JSON.stringify([],null,3))
                return []
            }
            console.log(error)
        }
    }
    async getById(id) {
        try{
            const file = await fs.promises.readFile(this.filePath,"utf8")
            const elements = JSON.parse(file)
            const product = elements.find(element => element.id == id)
            if (product)
                return product
        } catch (error){
            if ( error.code === "ENOENT"){
                await fs.promises.writeFile(this.filePath, JSON.stringify([],null,3))
                return []
            }
            console.log(error)
        }
    }
    async save( object ){
        try {
            const elements = await this.getAll()
            
            const productFound = elements.find(
                ({
                    title
                }) => title === object.title
            );

            if (productFound) {
                return null;
            } else {
                object.id = elements.length + 1;
                object.timestamp = this.date
                elements.push(object);
                const updatedFile = JSON.stringify(elements, null, " ");
                fs.promises.writeFile(this.filePath, updatedFile);
                return object;
            }
        }catch(error){
            console.log(error)
        }
    }


    async deleteById(idEntered){
        try{
            const dataParsed = await this.getAll()

            const leakedID = dataParsed.filter(({
                id
            }) => id != idEntered);
            const idFound = dataParsed.find(({
                id
            }) => id == idEntered);

            if (idFound) {
                console.log(
                    `Se ha eliminado el objeto con id:${idEntered} >> [[${idFound.title}]]`
                );
                const updatedFile = JSON.stringify(leakedID, null, " ");
                fs.promises.writeFile(this.filePath, updatedFile);
                return idFound;
            } else {
                console.log(`No se ha encontrado el objeto con id: ${idEntered}`);
            }
        }catch(error){
            console.log(error)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.filePath,JSON.stringify([],null,3))
        }catch(error){
            console.log(error)
        }
    }
    async updateById(id, newData){
        try{
            const elements = await this.getAll()
            const foundElementIndex = elements.findIndex((element) => element.id == id)
            if ( foundElementIndex === -1) return null
            const foundElement = elements[foundElementIndex]

            elements[foundElementIndex] ={
                ...foundElement,
                ...newData,
            }

            // for(const key in newData){
            //     if(foundElement.hasOwnProperty(key)){
            //         foundElement[key] = newData[key]
            //     }
            // }

            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify(elements,null,3)
            )
        }catch(error){
            console.log(error)
        }
    }
}

export { ContaienrFilesystem }