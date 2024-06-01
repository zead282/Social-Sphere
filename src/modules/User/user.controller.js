import user from "../../../DB/models/user.model.js";

export const updateaccount=async(req,res,next)=>{

    const{_id}=req.authUser;
    const{username,email,age}=req.body;
    ///check 
    if(email)
        {
            const isemailexxist=await user.findOne({email});
            if(isemailexxist) return next(new Error("email already exist"));
        }

    const updateduser=await user.findByIdAndUpdate({_id},{username,email,age},{new:true});
    if (!updateduser) return next(new Error('update fail'))
     res.status(200).json({ message: 'done', updateduser })    
}

////get user
export const getUserProfile = async (req, res, next) => {
    res.status(200).json({ message: "User data:", data: req.authUser })
}

//delete user

export const deleteAccount = async (req, res, next) => {
    const { _id } = req.authUser
    const deletedUser = await user.findByIdAndDelete(_id)
    if (!deletedUser) return next(new Error('delete fail'))
    res.status(200).json({ message: 'done' })
}

