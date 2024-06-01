
import mongoose from "mongoose";
const { Schema, model } = mongoose;


const likeschema=new Schema({
    likedBy:{type:Schema.Types.ObjectId,ref:'User'},
    likeDoneOnId:{type:Schema.Types.ObjectId,refPath:'onModel'},
    onModel:{
        type:String,
        enum:['Product','Comment','Reply']
    }
},
{timestamps:true})

export default mongoose.model('Likes',likeschema);