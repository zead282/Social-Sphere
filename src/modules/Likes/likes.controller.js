
import likesModel from "../../../DB/models/likes.model.js"
import productmodel from '../../../DB/models/product.model.js'
import replyModel from "../../../DB/models/reply.model.js"
import commentModel from "../../../DB/models/comment.model.js"

export const likeorunlike=async(req,res,next)=>{
    const{_id}=req.authUser;
    const{likeDoneOnId}=req.params;
    const{onModel}=req.body;

    let dbmodel='';
    if(onModel==='Product') dbmodel=productmodel;
    else if(onModel==='Reply') dbmodel=replyModel;
    else if(onModel==='Comment') dbmodel=commentModel;

    const document=await dbmodel.findById(likeDoneOnId);
    if (!document) return next(new Error(` ${onModel} is not found'`, { cause: 404 }))
    
    ///unlike
    const isliked=await likesModel.findOne({likedBy:_id,likeDoneOnId})

    if(isliked)
        {
            await likesModel.findByIdAndDelete(isliked._id);

            document.numberOfLikes-=1
            await document.save();
            return res.status(200).json({ message: 'unLike Done', count: document.numberOfLikes })
        }
    
    ////like
    await likesModel.create({onModel,likeDoneOnId,likedBy:_id})
    
    document.numberOfLikes+=1;
    await document.save();
    res.status(200).json({ message: 'Like Done', like, count: document.numberOfLikes })

}