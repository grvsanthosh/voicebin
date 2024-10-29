import React,{useState,useEffect} from 'react'
import AxiosService from '../../../utils/AxiosService.jsx'
import ApiRoutes from '../../../utils/ApiRoutes.jsx'
import toast from 'react-hot-toast'
function SearchBlogs() {
  let search = 'tata';
  
  const getData = async ()=>{
    try{
      let {data} = await AxiosService.get(`${ApiRoutes.GLOBAL_BLOG_SEARCH.path}/${search}`,{authenticate:ApiRoutes.GLOBAL_BLOG_SEARCH.auth})
      console.log(data)
        }
    catch(error){
      console.log(error)
      toast.error(error.data.message || "internal server error")

    }
  }

  useEffect(()=>{getData()},[])
  return (
    <div>
      SearchBlogs
    </div>
  )
}

export default SearchBlogs
