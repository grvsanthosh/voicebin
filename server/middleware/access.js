import auth from '../common/auth.js';
import UserModel from '../model/UserModel.js'

const accessExpriration = async (req,res,next) => {
    try{
        let token = req.headers.authorization?req.headers.authorization.split(" ")[1]:undefined;
        
        if(token){
            let payload = await auth.decodeToken(token);
            if(payload.exp > (Math.floor(Date.now()/1000))){
                next();
            }      
            else{
                res.status(401).send({
                    message: "Token expired..."
                })
            }
            
        }
        else{
            res.status(401).send({
                message: "Unauthorized..."
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal server error",
            error

        })
    }
}

const adminAccess = async (req,res,next) => {
    try{
        let token = req.headers.authorization?req.headers.authorization.split(" ")[1]:undefined;
        
        if(token){
            let payload = await auth.decodeToken(token);
            
            let user = await UserModel.findById(payload._id);

            if(user && payload.role === "Admin" && user.role === payload.role && payload._id === user._id.toString()){
                next();
            }      
            else{
                res.status(403).send({
                    message: "Forbidden...",
                })
            }
            
        }
        else{
            res.status(401).send({
                message: "Unauthorized..."
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal server error",
            error

        })
    }
}

const userAccess = async (req,res,next) => {
    try{
        let token = req.headers.authorization?req.headers.authorization.split(" ")[1]:undefined;
        
        if(token){
            let payload = await auth.decodeToken(token);
            
            let user = await UserModel.findById(payload._id);

            if(user && payload.role === "User" && user.role === payload.role && payload._id === user._id.toString()){
                req.headers.userId = payload.userId;
                next();
            }      
            else{
                res.status(403).send({
                    message: "Access denied for Admin to perform editing..."
                })
            }
            
        }
        else{
            res.status(401).send({
                message: "Unauthorized..."
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal server error",
            error

        })
    }
}

const allBlogAccess = async (req,res,next)=>{
    try{
        let token = await req.headers.authorization?.split(" ")[1];
        if(token){
            let payload = await auth.decodeToken(token);
            let user = await UserModel.findById(payload._id)
            
            if(user && payload.role === user.role){
                next();
            }
        }
        else{
            
            res.status(401).send({
                message: "Unauthorized..."
                
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message || "Internal server error",
            error
    })
}
}



export default {accessExpriration,adminAccess,userAccess,allBlogAccess}