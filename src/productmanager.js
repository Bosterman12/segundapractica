import {promises as fs} from "fs"

export class ProductManager {
    constructor(path){
        
        this.path = path
        
        
        }  
        static incrementarID(){
            if(this.idIncrement){
                this.idIncrement++
            }else{
                this.idIncrement = 1
            }
    
            return this.idIncrement
              }

    async addProduct(producto){
        const prodsJson = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJson)
        producto.id = ProductManager.incrementarID()
        prods.push(producto)
        await fs.writeFile(this.path, JSON.stringify(prods))
        return "Producto creado"
    }

    async getProducts(){
        const prods = await fs.readFile(this.path, "utf-8")
        return JSON.parse(prods)

    }

    async getProductById(id){
        const prodsJson = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJson)
        if(prods.some(prod => prod.id === parseInt(id))){
            return prods.find(prod => prod.id === parseInt(id))
        }else{
            "Producto no encontrado"
        }
    } 

    async updateProduct (id,{title, description, price, thumbnail, status, code, stock}){
        const prodsJson = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJson)
        if(prods.some(prod => prod.id === parseInt(id))){
            let index = prods.findIndex (prod => prod.id === parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail
            prods[index].status = status
            prods[index].code = code
            prods[index].stock = stock

        await fs.writeFile(this.path, JSON.stringify(prods))
        return "Producto actualizado"
            }else{
                return "producto no encontrado"
            }

        }

        async deleteProduct(id){
        const prodsJson = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJson)
        if(prods.some(prod => prod.id === parseInt(id))){
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto eliminado"
        }else{
            return "Producto no encontrado"
        }
        }
    }
    


/*class Product {
    constructor(title = "", description = "", price = 0, thumbnail = "", code = "", stock = 0){
        
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementID()
    }
    
    static incrementID(){
        if(this.idIncrement){
            this.idIncrement++
        }else{
            this.idIncrement = 1
        }

        return this.idIncrement
          } 
    
};







const product1 = new Product ("salame", "picado grueso", 100,"","s1",30)
const product2 = new Product ("queso","pategras",200,"","q1",20)
const product3 = new Product ("leber", "leberwurst",50,"","l1",50)
const product4 = new Product ("pan","flauta",10,"","p1",100)

console.log(product1)
console.log(product2)
console.log(product3)
console.log(product4)


/*const prod = new ProductManager()

productManager.addProduct(product1)
productManager.addProduct(product2)
console.log(productManager.addProduct(product1))
console.log(productManager.getProductById(2))
console.log(productManager.getProductById(5))
console.log(productManager.getProducts())

console.log(productManager)*/

