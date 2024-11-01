import React, {useState,useEffect} from 'react'
import Post from './helper/Post.jsx'
import axiosService from '../utils/AxiosService.jsx'
import ApiRoutes from '../utils/ApiRoutes.jsx'
import toast from 'react-hot-toast'

function Blogfeeds() {
  let [globalFeed,setglobalFeed] = useState([])

  let getData = async ()=>{
    try{
      let {data}= await axiosService.get(ApiRoutes.GLOBAL_BLOG_FEED.path,{authenticate:ApiRoutes.GLOBAL_BLOG_FEED.auth})
      
      setglobalFeed(data)
    }
    catch(error){
      if(error.status===401){
        toast.error(error.data.message || "internal server error")
        setTimeout(()=>{window.location.assign('/home')},2000)
      }
      else{
      toast.error(error.data.message || "internal server error")
      }
    }
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <div className='home-wrapper'>
      {
        globalFeed.map((blog,i)=>{  
          return <Post 
            key={i}
            title={blog.title}
            image={blog.image}
            description={blog.description}
            userName={blog.userName}
            
          />

        })
      }
    </div>
  )
}

export default Blogfeeds
