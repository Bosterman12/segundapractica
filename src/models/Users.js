import { Schema, model } from "mongoose";
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.plugin(paginate)

export const userModel = model("users", userSchema)

/*const userModel = model("users", userSchema)
export default userModel*/