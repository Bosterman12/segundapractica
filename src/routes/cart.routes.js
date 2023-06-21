import { Router } from "express";
import { CartManager } from "../CartManager.js";
import { cartModel } from "../models/Cart.js";

//const cartmanager = new CartManager ('carrito.txt')

const cartRouter = Router()


cartRouter.get('/:cid', async (req, res) => {
    const cart = await cartModel.findOne({_id: req.params.cid})
    res.send(cart)
    
})

cartRouter.post('/', async (req,res) => {
    const cart = await cartModel.create({})
    res.send("carrito creado")
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
      const { quantity } = req.body
  
      const cart = await cartModel.findOne({_id: cid})
      const addProductCart = {
        id_prod: pid,
        cant: quantity
      }
      cart.products.push(addProductCart)
      cart.save()
    } catch (err) {
      console.log(err)
    }
    res.send('Producto agregdo al carrito')
  })
  
  cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
    
  
      const cart = await cartModel.findOne({_id: cid})
      const productsAdded = cart.products

      const productToDelete = productsAdded.findIndex((prod) => prod.id_prod == pid)

      productsAdded.splice(productToDelete,1)

      await cartModel.updateOne({_id : cid},{products : productsAdded})

      
      
      
    } catch (err) {
      console.log(err)
    }
    res.send('Producto eliminado del carrito') 
  })

  cartRouter.put('/:cid/product/:pid', async (req, res) => {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
      const { cant } = req.body
    
  
      const cart = await cartModel.findOne({_id: cid})
      const productsAdded = cart.products
      

      const productToModify = productsAdded.findIndex((prod) => prod.id_prod == pid)
      console.log(productToModify)
      productsAdded[productToModify].cant = cant

      await cartModel.updateOne({_id : cid}, {products : productsAdded})

      
      
      
    } catch (err) {
      console.log(err)
    }
    res.send('Cantidad modificada') 
  })

  cartRouter.delete('/:cid', async (req, res) => {
    try {
      const cid = req.params.cid
      
    
  
      const cart = await cartModel.findOne({_id: cid})

      cart.products = []

      

      await cartModel.updateOne({_id : cid},cart)

      
      
      
    } catch (err) {
      console.log(err)
    }
    res.send('Todos los productos fueron eliminados') 
  })
  
/*cartRouter.post('/', async (req,res) => {
    
    const {idCart, id, cantidad} = req.body
    const mensaje = await cartmanager.addProductCart(idCart,{id, cantidad})
    res.send(mensaje)
})*/



export default cartRouter