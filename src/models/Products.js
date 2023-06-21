import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";


const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    tumbnail:[]
})

productSchema.plugin(paginate)
export const productModel = model( "products", productSchema)

/*const productModel = model( "products", productSchema)

export default productModel*/