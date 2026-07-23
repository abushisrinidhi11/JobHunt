import {Request,Response,NextFunction} from "express";
import * as yup from "yup";

const validate=(schema:yup.AnyObjectSchema)=>
{
    return async(req:Request,res:Response,next:NextFunction)=>
    {
        try
        {
            console.log("Validation middleware called");

            req.body=await schema.validate(
                req.body,
                {
                    abortEarly:false,
                    stripUnknown:true
                }
            );

            console.log("Validation successful");

            next();
        }
        catch(error:any)
        {
            console.log("Validation failed");

            return res.status(400).json({
                success:false,
                message:"Validation failed",
                errors:error.errors
            });
        }
        finally
        {
            console.log("Validation middleware completed");
        }
    };
};

export default validate;