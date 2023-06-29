import { Schema, SchemaTypes, model } from "mongoose";
import paginate from "mongoose-paginate-v2";




const userSchema = new Schema ({
    
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true
    },

    cart : {
        type : SchemaTypes.ObjectId,
        ref: 'carts'
    },

    role: {
        type: String,
        required: true,
        default: 'user'
    }
})

userSchema.plugin(paginate)

export const userModel = model("users", userSchema)

/*const userModel = model("users", userSchema)
export default userModel*/