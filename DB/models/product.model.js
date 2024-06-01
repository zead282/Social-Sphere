import mongoose from "mongoose";
const { Schema, model } = mongoose;
const productschema=new Schema({
    title:{type:String,required:true},
    caption:{type:String,required:true},
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfLikes: { type: Number, default: 0, min: 0 },
    Images: [{
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true, unique: true },
        folderId: { type: String, required: true, unique: true }
    }]
   
},
{timestamps:true})

export default mongoose.model('Product',productschema);

