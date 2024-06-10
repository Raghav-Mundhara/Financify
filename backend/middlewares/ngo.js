import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const ngoMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        try{
            const result=jwt.verify(token,process.env.JWT_SECRET);
            req.userId=result.id;
            console.log("Passed Middleware check!");
            next();
        }catch(err){
            return res.json({err})
        }
    }else{
        return res.json({
            msg:"Unauthorized Access"
        });
    }
};