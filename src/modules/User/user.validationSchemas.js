
import Joi from 'joi';

export const singupschema={
    body:Joi.object({
        username:Joi.string().min(4).max(10).alphanum().required().messages({
            'any.required': 'please enter your username'
        }),

        email:Joi.string().email({tlds:{allow:['com','org','yahoo']}}).required(),

        password:Joi.string().required(),
        cpass:Joi.string().valid(Joi.ref('password')),

        age:Joi.number().min(10).max(100),
        gender:Joi.string().valid('female','male')
    }).with('password','cpass').with('email','password')
}
