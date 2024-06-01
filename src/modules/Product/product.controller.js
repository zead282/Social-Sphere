import axios from "axios";
import productModel from "../../../DB/models/product.model.js";
import generateUniqueString from "../../utils/generateUniqueString.js";
import likemodel from '../../../DB/models/likes.model.js'
import cloudinaryConnection from '../../utils/cloudinary.js'
import commentModel from "../../../DB/models/comment.model.js";
export const addproduct=async(req,res,next)=>{

    const{_id}=req.authUser
    const{title,caption}=req.body;
    if(!req.files?.length) return next(new Error('please upload images', { cause: 400 }))
    
    let publicidsarr=[]
    let Images=[]
    const folderId=generateUniqueString(5);
    for(const file of req.files)
        {
            const{secure_url,public_id}=await cloudinaryConnection().uploader.upload(file.path,{
                folder:`upvote/products/${_id}/${folderId}`,
                use_filename:true,
                unique_filename:true
            })
            publicidsarr.push(public_id);
            Images.push({secure_url,public_id,folderId})

        }
         // create product
    const product = await productModel.create({ title, caption, addedBy: _id, Images })
    if (!product) {
        const deletedData = await cloudinaryConnection().api.delete_resources(publicidsarr)
        // console.log(deletedData);
        return next(new Error('add product fail'))
    }
    res.status(201).json({ message: 'done', product })


}

export const updateproduct=async(req,res,next)=>{
    const{caption,title,oldpublicid}=req.body;
    const{_id}=req.authUser;
    const{productId}=req.params;

    const findproduct=await productModel.findOne({addedBy:_id,_id:productId});
    if(!findproduct) return next(new Error('product not found', { cause: 404 }))

    ///update
    findproduct.title=title;
    findproduct.caption=caption;
    if(oldpublicid)
        {
            if(!req.file) return next(new Error('please upload the new image', { cause: 400 }))
            await cloudinaryConnection().uploader.destroy(oldpublicid)
            //const newpublicid=oldpublicid.split(`${findproduct.Images[0].folderId}/`)[1]    
            const { secure_url,public_id } = await cloudinaryConnection().uploader.upload(req.file.path, {
                folder: `upvote/products/${_id}/${findproduct.Images[0].folderId}`,
                
            })
            findproduct.Images.map(ell=>{
                if(ell.public_id===oldpublicid){
                    ell.public_id=public_id
                    ell.secure_url=secure_url
                }
            })
        }    
        await findproduct.save();
        res.status(200).json({ message: 'Updated Done', findproduct})

}


export const deleteproduct=async(req,res,next)=>{
    const{productid}=req.params;
    const{_id}=req.authUser;

    ///check product
    const isproduct=await productModel.findOneAndDelete({addedBy:_id,_id:productid});

    if(!isproduct) return next(new Error("product not found"));

    let publicids=[];
    for(const image of isproduct.Images)
        {
            publicids.push(image.public_id)
        }
    
    await cloudinaryConnection().api.delete_resources(publicids);
    res.status(200).json({ message: 'Deleted Done' })    
}


export const likeOrUnlikeProduct = async (req, res, next) => {
    /**
     * step 1
     * step 2
     * step 3 
     * logic of likeOrUnlike  => send request to likeOrUnlike router
     */
    const { productId } = req.params
    const { onModel } = req.body
    const { accesstoken } = req.headers

    axios({
        method: 'post',
        url: `http://localhost:3000/like/${productId}`,
        data: {
            onModel
        },
        headers: {
            accesstoken
        }
    }).then((response) => {
        // console.log(response.data);
        res.status(200).json({ response: response.data })
    }).catch((err) => {
        // console.log(err);
        res.status(500).json({ catch: err.data })
    })

}

export const getproductlikes=async(req,res,next)=>{
    const{productid}=req.params;
    const likes=await likemodel.find({likeDoneOneId:productid}).populate([{path:"likeDoneOnId"}])
    res.status(200).json({ message: 'done', likes })
}

export const getcomments=async(req,res,next)=>{
    const{productid}=req.params;
    const commentss=await commentModel.find({productId:productid}).populate('productId')

    res.status(200).json({message:"done",commentss})
}