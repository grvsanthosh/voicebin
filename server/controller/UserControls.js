import UserModel from '../model/UserModel.js'
import auth from '../common/auth.js'
import { randstring } from '../common/helper.js';

const editprofile = async(req,res)=>{
    try{
        
        let currentUserName = await UserModel.findOne({userId:req.params.editprofile},{password:0,_id:0});        
        let currentUserId = currentUserName.userId;
        if(currentUserId === req.headers.userId){
            let presentUserName = await UserModel.find({userName:req.body.userName},{password:0});
            
            let data = presentUserName.map((e)=>{
                
                if(e._id.toString() !== currentUserId)
                {   
                    
                    return -1
                }
                return 1
                
            })   
            
            if(data){
                currentUserName.firstName = req.body.firstName;
                currentUserName.lastName = req.body.lastName;
                currentUserName.email = req.body.email;
                currentUserName.mobile = req.body.mobile;
                currentUserName.userName = req.body.userName;
                await currentUserName.save();
                res.status(200).send({
                    message: "profile edited successfully",
                    data: currentUserName
            })
            }
            else{
                res.status(400).send({
                    message: "User with same user name already exists",
                })
            }
        }
        else{
            res.status(404).send({message: "Your user name did not match"})
        }
        
    }
    catch(error){
        res.status(500).send({message: "Invalid user name"})
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
        res.status(400).send({message: error.message})
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
                    token
                })

            }
        }
        else{
            res.status(404).send({
                message: "User not found",
                
            })

        }
    }
    catch(error){

    }
}

const removeaccount = async(req,res)=>{
    try{
        let currentUserName = await UserModel.findOne({userId:req.params.removeaccount},{password:0});        
        let currentUserId = currentUserName.userId;
        
        if(currentUserId === req.headers.userId){
            
                let validUser = await UserModel.find({role:"User"})
               if((validUser.length - 1)>0){
                    await UserModel.deleteOne({userId:req.params.removeaccount})
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

export default {editprofile,removeaccount,signup,login}