import userModel from '../model/UserModel.js'
import blogsModel from '../model/BlogModel.js';

const getAllUsers = async(req,res)=>{
    try{
        let user = await userModel.find({role:"User"},{password:0,_id:0});
        res.status(200).send({
            "message":"getAllUsers is successful",
            data:user
        })
    }
    catch(error){
        
        res.status(500).send({
            message: error.message||"internal server error",
            error
        })
    }
}

const getAllAdmins = async(req,res)=>{
    try{
        let user = await userModel.find({role:"Admin"},{password:0,_id:0});
        res.status(200).send({
            "message":"Get all Admin is successful",
            data:user
        })
    }
    catch(error){
        
        res.status(500).send({
            message: error.message||"internal server error",
            error
        })
    }
}

const adminaccess = async(req,res)=>{
    try{
        let user = await userModel.findOne({userId:req.params.adminaccess});

        if(user){
            if(user.role!=="Admin"){
                user.role = "Admin";
                await user.save();
                res.status(201).send({
                    message:"Admin access granted",
                    data: user
                })
                
            }
            else{
                res.status(400).send({
                    message:"Admin access already granted"
                })
            }
        }
        else{
            res.status(400).send({
                message:"User not found"
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

const revokeaccess = async(req,res)=>{
    try{

        let user = await userModel.findOne({userId:req.params.revokeaccess});

        if(user){
            if(user.role==="Admin"){
                let validAdmin = await userModel.find({role:"Admin"})
                
                if((validAdmin.length - 1)>0){
                    user.role = "User";
                await user.save();
                res.status(201).send({
                    message:"Revoked admin access",
                    data: user
                })
                }
                else{
                    res.status(400).send({
                        message:"No more admins left to revoke admin access"
                    })
                }
                
            }
            else{
                res.status(400).send({
                    message:"Not an Admin..."
                })
            }
        }
        else{
            res.status(400).send({
                message:"User not found"
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

const removeadmin = async(req,res)=>{
    try{

        let user = await userModel.findOne({userId:req.params.removeadmin});
       
        if(user){
            if(user.role==="Admin"){
                let validAdmin = await userModel.find({role:"Admin"})
               if((validAdmin.length - 1)>0){
                await userModel.deleteOne({userId:req.params.removeadmin})
                res.status(201).send({
                    message:"Deleted Admin account",
                    data:user
                })
               }
                else{
                    res.status(400).send({
                        message:"Cannot delete last admin account",
                    })
                }
                
                
            }
            else{
                res.status(400).send({
                    message:"Not an Admin account",
                })
            }
        }
        else{
            res.status(400).send({
                message:"user not found",
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

const approveblog = async (req,res)=>{
    try{
        let blogId = await blogsModel.findOne({blogId:req.params.approveblog});
        if(blogId){
            blogId.status = req.body.status;
            await blogId.save();
            res.status(200).send({
                "message":"Blog updated successfully",
                data:blogId
            });
        }
        else{
            res.status(404).send({
                "message":"Blog not found"
            });
        }

    }
    catch(err){
        res.status(500).send({
            "message": err.message,
            err
        });
    }
}

const getAllBlogs = async (req,res)=>{

    try{
        let blogs = await blogsModel.aggregate([
            {
              
              $lookup:{
                      from:'users',
                      localField:'userId',
                      foreignField:'userId',
                      as:'userDetails'
                  }
              },
            {
                  $project:{
                      title:1,
                      image:1,
                      description:1,
                      blogId:1,
                      status:1,
                      userName:'$userDetails.userName'
                  }
              },
            {$unwind:'$userName'}
            
          ]);
        res.status(200).send({
            "message":"getAllBlogs is successful",
            data:blogs
        })
    }
    catch(err){
        res.status(500).send({
            "message": err.message,
            err
        });
    }   
}

const pendingblogs = async (req,res)=>{

    try{
        let blogs = await blogsModel.aggregate([
            {
              
              $lookup:{
                      from:'users',
                      localField:'userId',
                      foreignField:'userId',
                      as:'userDetails'
                  }
              },
            {
                  $project:{
                      title:1,
                      image:1,
                      description:1,
                      blogId:1,
                      status:1,
                      userName:'$userDetails.userName'
                  }
              },
            {$unwind:'$userName'},
            {
                  $match:{
                      status:'Pending'
                  }
              }
          ]);

        res.status(200).send({
            "message":"Get all Pending blog is successful",
            data:blogs
        })
    }
    catch(err){
        res.status(500).send({
            "message": err.message,
            err
        });
    }   
}

const rejectedblogs = async (req,res)=>{

    try{
        let blogs = await blogsModel.aggregate([
            {
              
              $lookup:{
                      from:'users',
                      localField:'userId',
                      foreignField:'userId',
                      as:'userDetails'
                  }
              },
            {
                  $project:{
                      title:1,
                      image:1,
                      description:1,
                      blogId:1,
                      status:1,
                      userName:'$userDetails.userName'
                  }
              },
            {$unwind:'$userName'},
            {
                  $match:{
                      status:'Rejected'
                  }
              }
          ]);

        res.status(200).send({
            "message":"Get all Rejected blog is successful",
            data:blogs
        })
    }
    catch(err){
        res.status(500).send({
            "message": err.message,
            err
        });
    }   
}

export default {getAllUsers,getAllAdmins,adminaccess,revokeaccess,removeadmin,approveblog,getAllBlogs,pendingblogs,rejectedblogs}
