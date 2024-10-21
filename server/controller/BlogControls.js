import blogsModel from '../model/BlogModel.js';
import {randstring} from '../common/helper.js'

const approvedblogs = async (req,res)=>{

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
                      status:'Approved'
                  }
              }
          ]);

        res.status(200).send({
            "message":"Get all approved blog is successful",
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



const getBlogsByuserId = async (req,res)=>{
    try{
        let userId = await req.params.userid;      
        if(userId === req.headers.userId){
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
                      userId:1,
                      userName:'$userDetails.userName'
                  }
              },
            {$unwind:'$userName'},
            {
                  $match:{
                    userId:userId
                  }
              }
          ]);  
        if(blogs.length){
           let userBlog = blogs.map((e)=>{
                return e
            })
            
            res.status(200).send({
                "message":"Blogs retrieved successfully",
                data:userBlog
            });
        }
        else{
            res.status(404).send({
                "message":"No blogs found for this user",
            });
        }
    }
    else{
        res.status(403).send({
            message: "Your user name did not match"
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

const createBlog = async (req,res)=>{
    try{
        let blog = await blogsModel.findOne({title:req.body.title});
        if(!blog){
            let payloaduserId = req.headers.userId;                  
            if(payloaduserId){
                req.body.blogId = randstring(25);
                req.body.userId = payloaduserId;
                await blogsModel.create(req.body);
                res.status(201).send({
                    message:"Blog ready for posting... waiting for approval",                
                 });
                }
                else{
                    res.status(401).send({
                        message: "Unauthorized..."
                    });                
                }  
            }  
        else{
            res.status(400).send({
                "message":"Blog already exists"
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

const search = async (req,res)=>{
    try{
            let title = req.body.title;            
            // let blog = await blogsModel.find({$or:[{title:{$regex:title,$options :'i'}},{description:{$regex:title,$options :'i'}}]})
            let blog = await blogsModel.aggregate([
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
                        $and:[{status:'Approved'},{$or:[{title:{$regex:title,$options :'i'}},{description:{$regex:title,$options :'i'}}]}]                       
                          
                      }
                  }
               
              ])
            
            if(blog.length){
                let blogResult = blog.map((e)=>{
                    return e
                })
                res.status(200).send({
                    message:"search success",
                    data:blogResult
                })
            }
            else{
                res.status(404).send({
                    message:"Blog not found"
                })
            }
        }
    catch(err){
        res.status(500).send({
            "message": err.message,
            err
        });
    }
}


export default {approvedblogs,getBlogsByuserId,createBlog,search}