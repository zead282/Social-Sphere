import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../../../DB/models/user.model.js'
import sendemailservice from '../../services/send-email-service.js'


export const signUp=async(req,res,next)=>{
    const{username,email,password,age,gender}=req.body

    const isemaildublicated=User.findOne({email});

    if(!isemaildublicated.length==0) return next(new Error('email already exist',{cause:409}))
     
    ///send email to user
    const usertoken=jwt.sign({email},process.env.JWT_SECRET_VERFICATION,{expiresIn:'5m'})
    
    const isemailsent=await sendemailservice({
        to:email,
        subject:"email verfication",
        message:`<h2>please check link</h2>
        <a href="http://localhost:3000/auth/verify-email?token=${usertoken}">verify email</a>`
 
    })

    if(!isemailsent) return next(new Error('email not sent',{cause:500}))

    const hashpass=bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    
    const newuser=await User.create({
        username,password:hashpass,email,age,gender
    })

    if(!newuser) return res.json("user doesnt added")

    res.status(201).json({
        success: true,
        message: 'User created successfully, please check your email to verify your account',
        data: newuser
    })
}

///verify email

export const verifyemail=async(req,res,next)=>{
    const{token}=req.query;

    const decodeddata=jwt.verify(token,process.env.JWT_SECRET_VERFICATION)

    const userr=await User.findOneAndUpdate({
        email:decodeddata.email,isEmailVerified:false
    },{isEmailVerified:true})

    if(!userr) return next(new Error('user not found',{cause:404}))
    
        
     res.status(200).json({
          success: true,
          message: 'Email verified successfully, please try to login'
      })    
}


export const SignInHandeler = async (req, res, next) => {
    const { email, password } = req.body

    // email check
    const isEmailExists = await User.findOne({ email })
    if (!isEmailExists) return next(new Error('invalid login credentials', { cause: 404 }))

    // hash password
    const isPasswordMatched = bcrypt.compareSync(password, isEmailExists.password)
    if (!isPasswordMatched) return next(new Error('invalid login credentials', { cause: 404 }))
    const token = jwt.sign(
        { id: isEmailExists._id, userEmail: isEmailExists.email, role: isEmailExists.role },
        process.env.LOGIN_SIGNATURE,
        {
            expiresIn: '1h',
            // algorithm:'ES512'
        }
    )
    return res.status(200).json({ message: 'User LoggedIn successfully', token })
}