import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    mobile : {
        type: Number,
        default:0
    }, 
    place: {
        type: String,
        default:"nill"
    }, 
    isAdmin : {
        type: Boolean,
        default: false
    } ,
    profilepic: {
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    }
}, { timestamps : true })

const User = mongoose.model('User', userSchema)

export default User;