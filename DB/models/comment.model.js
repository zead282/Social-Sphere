import  mongoose from "mongoose";
const { Schema, model } = mongoose;
const commentschema=new Schema({
    content:{type:String,required:true},
    addedBy:{type:Schema.Types.ObjectId,ref:'User'},
    productId:{type:Schema.Types.ObjectId,ref:'Product'},
    numberOfLikes:{type:Number,default:0,min:0}
},
    {timestamps:true})

export default mongoose.model('Comment',commentschema);    