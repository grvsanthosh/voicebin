import mongoose from './index.js';

const blogsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"],
       
    },
    userId:{
        type:String,
        required:[true,"UserId is required"]
    },
    blogId:{
        type:String,
        required:[true,"BlogId is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    status:{
       type:String,
       enum:{
        values: ['Pending', 'Approved', 'Rejected'],
        message: '{VALUE} is not supported'
       },
       default:'Pending'
    }

},
{
    collection:'blogs',
    versionKey:false
})

const blogsModel = new mongoose.model('blogs',blogsSchema)

export default blogsModel;