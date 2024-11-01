import UserModel from '../model/UserModel.js'
import auth from '../common/auth.js'
import { randstring } from '../common/helper.js';

const editprofile = async(req,res)=>{
    try{
        let paramUser = await UserModel.findOne({userId:req.params.userid},{password:0,status:0,role:0});   
        let paramUserId = paramUser.userId;
        let data = req.body.userName;
        let userData = await validate(data)
        if((userData.validateUsercount === 0) || (userData.validateUserName[0].userId === paramUserId)){
            paramUser.firstName = req.body.firstName;
            paramUser.lastName = req.body.lastName;
            paramUser.email = req.body.email;
            paramUser.mobile = req.body.mobile;
            paramUser.userName = req.body.userName;
            await paramUser.save();
            res.status(200).send({
                message: "Profile updated successfully",
                data: paramUser
            })
        }
        // else if(userData.validateUserName[0].userId === paramUserId ){
        //     paramUser.firstName = req.body.firstName;
        //     paramUser.lastName = req.body.lastName;
        //     paramUser.email = req.body.email;
        //     paramUser.mobile = req.body.mobile;
        //     paramUser.userName = req.body.userName;
        //     await paramUser.save();
        //     res.status(200).send({
        //         message: "Profile updated successfully",
        //         data: paramUser
        //     })
        // }
        else{
            res.status(400).send({
                message: "User already exists",
                
            })
        }

    }        
    catch(error){
        res.status(500).send({
            message: error.message||"internal server error",
            
        })
    }
}

const validate = async(data)=>{
    try{
        let validateUsercount = await UserModel.find({userName:data},{password:0}).countDocuments();
        let validateUserName = await UserModel.find({userName:data},{password:0});        
        return {validateUserName,validateUsercount};        
    }

    catch(error){
        console.error(error);
        return false;
    }
    
}


const signup = async(req,res)=>{
    try{
        let user = await UserModel.findOne({userName:req.body.userName})
        if(!user){
            req.body.password = await auth.hashedPassword(req.body.password);
            req.body.userId = randstring(25)
            await UserModel.create(req.body);
            res.status(201).send({
                message: "User created successfully",
                
            })

        }
        else if (user){
            res.status(400).send({
                message: "User already exists",
                
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message||"internal server error",
            
        })
    }

}

const login = async(req,res)=>{
    try{
        let user = await UserModel.findOne({userName:req.body.userName});
        if(user){
            if(await auth.hashcompare(req.body.password,user.password)){
                let payload = {
                    _id:user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    userName: user.userName,
                    userId:user.userId
                }
                let token = await auth.createToken(payload);
                res.status(201).send({
                    message:"Login successful",
                    token:token,
                    role: user.role,
                    userId: user.userId

                })

            }
            else{
                res.status(401).send({
                    message: "Invalid User name or password",
                    
                })
            }
        }
        else{
            res.status(401).send({
                message: "Invalid User name or password",
                
            })

        }
    }
    catch(error){
        res.status(500).send({
            message: error.message||"internal server error",
            
        })
    }
}

const getProfileById = async (req,res)=>{
    try{
        let user = await UserModel.findOne({userId:req.params.userid},{password:0,_id:0,userId:0,status:0,role:0});
        if(user){
            res.status(200).send({
                message: "User found successfully",
                data: user
            })
        }
        else{
            res.status(404).send({message: "User not found"})
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message||"internal server error",
            
        })
    }
}

const removeaccount = async(req,res)=>{
    try{
        let currentUserName = await UserModel.findOne({userId:req.params.userid},{password:0});        
        let currentUserId = currentUserName.userId;
        
        if(currentUserId === req.headers.userId){
            
                let validUser = await UserModel.find({role:"User"})
               if((validUser.length - 1)>0){
                    await UserModel.deleteOne({userId:req.params.userid})
                    res.status(201).send({
                    message:"Deleted User account",
                    data:currentUserName
                })
               }
                else{
                    res.status(400).send({
                        message:"Cannot delete last user account",
                    })
                }  
            
        }       
        else{
            res.status(400).send({
                message:"Your user name did not match",
            })
        }
    }
    catch(error){
        res.status(500).send({
            message: error.message||"internal server error",
            error
        })
    }
}

export default {editprofile,getProfileById,removeaccount,signup,login}