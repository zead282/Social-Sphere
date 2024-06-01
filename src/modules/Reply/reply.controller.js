
import replyModel from "../../../DB/models/reply.model.js";
import commentModel from "../../../DB/models/comment.model.js";
import productModel from "../../../DB/models/product.model.js";
import axios from "axios";



export const addreply=async(req,res,next)=>{
    const{onModel,content}=req.body;
    const{_id}=req.authUser;
    const{replyonid}=req.params

    if(onModel=='Reply') {
        const product=await productModel.findById(replyonid);
        if(!product) if (!reply) return next(new Error('reply not found', { cause: 404 }))
    }
    else if(onModel=='Comment'){
        const comment=await commentModel.findById(replyonid);
        if(!comment) return next(new Error('comment not found', { cause: 404 }))
    }
    const reply = await replyModel.create({ content, addedBy: _id, onModel, replyonid })
    res.status(201).json({ message: 'reply added successfully', reply })
}

export const likeunlikereply=async(req,res,next)=>{
    const{onModel}=req.body;
    const{accesstoken}=req.headers;
    const{replyid}=req.params;

    const isreply=await replyModel.findById(replyid);
    if(!isreply) return next(new Error("reply not found"));
    axios({
        method: 'post',
        url: `http://localhost:3000/like/${replyid}`,
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

