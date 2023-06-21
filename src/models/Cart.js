import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod:{
                    type: Schema.Types.ObjectId,
                    ref:"products"
                },
                cant : { type: Number,
                        required: true
            }}
        ],
        default:[]
    }
})

cartSchema.plugin(paginate)
export const cartModel = model( "carts", cartSchema)