import userModel from '../model/UserModel.js'
import blogsModel from '../model/BlogModel.js';

const statusCheck = ["Approved","Rejected","Pending"]
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
        let user = await userModel.findOne({userId:req.body.userid});

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

        let user = await userModel.findOne({userId:req.body.userId});

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
        let user = await userModel.findOne({userId:req.params.userid});
       
        if(user){
            if(user.role==="Admin"){
                let validAdmin = await userModel.find({role:"Admin"})
                if((validAdmin.length - 1)>0){
                        await userModel.deleteOne({userId:req.params.userid})
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
        let blogId = await blogsModel.findOne({blogId:req.body.blogId});
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

const BlogSearch = async (req,res)=>{
    
    try{
        let status = req.params.status
        let search = req.params.search
    
        if(statusCheck.includes(status) && search !== ":search"){
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
                      $and:[{status:status},{$or:[{title:{$regex:search,$options :'i'}},{description:{$regex:search,$options :'i'}}]}]                       
                        
                    }
                }
                
              ]);
            if(blogs.length){
                res.status(200).send({
                    "message":"successful",
                    data:blogs
                })
            }
            else{
                res.status(404).send({
                    "message":"No blogs found"
                });
            }
        }
        else{
            res.status(404).send({
                "message":"Invalid status or search options"
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

const fetchBlogByStatus = async (req,res)=>{
    
    try{
        let status = req.params.status
        if(statusCheck.includes(status)){
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
                          status:status
                      }
                  }
            ]);
            if(blogs.length){
                res.status(200).send({
                    "message":"successful",
                    data:blogs
                })
            }
            else{
                res.status(404).send({
                    "message":"No blogs found"
                });
            }  
        }
        else{
            res.status(404).send({
                "message":"Select valid status"
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



export default {getAllUsers,getAllAdmins,adminaccess,revokeaccess,removeadmin,approveblog,BlogSearch,fetchBlogByStatus}
