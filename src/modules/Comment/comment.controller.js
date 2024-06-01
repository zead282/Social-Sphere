import commentModel from '../../../DB/models/comment.model.js'
import productModel from '../../../DB/models/product.model.js'
import axios from 'axios'

export const addComment = async (req, res, next) => {
    const { content } = req.body
    const { _id } = req.authUser
    const { productId } = req.params

    // check productId
    const product = await productModel.findById(productId)
    if (!product) return next(new Error('product not found', { cause: 404 }))

    // create comment
    const comment = await commentModel.create({ content, addedBy: _id, productId })

    res.status(201).json({ message: 'comment added successfully', comment })
}

export const likeorunlikecomment=async(req,res,next)=>{
    const { accesstoken } = req.headers
    const{onModel}=req.body;
    const{commentid}=req.params;

    axios({
        method: 'post',
        url: `http://localhost:3000/like/${commentid}`,
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
         console.log(err);
        res.status(500).json({ catch: err.data })
    })


}
