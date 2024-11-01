import React,{useEffect,useState} from 'react'
import toast from 'react-hot-toast';
import AxiosService from '../../../utils/AxiosService.jsx'
import ApiRoutes from '../../../utils/ApiRoutes.jsx'
import placeholder from '../../../assets/placeholderImage.jpg';
import profile from '../../../assets/profile.jpg';

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBIcon
  } from 'mdb-react-ui-kit';

function MyBlogs() {
  let userId = sessionStorage.getItem('userId');
  let [myBlogs,setMyBlogs] = useState([]);
  let dummyText = "Your sample description for this post is here."
   
  let statusText = [
      {
          status:"Approved",
          variant:"success"
      },
      {
          status:"Pending",
          variant:"warning"
      },
      {
          status:"Rejected",
          variant:"danger"
      }
  ]
  const getData = async ()=>{
    try{
      let {data} = await AxiosService.get(`${ApiRoutes.GET_BLOG_BY_USERID.path}/${userId}`,{authenticate:ApiRoutes.GET_BLOG_BY_USERID.auth})
      
      setMyBlogs(data)
    }
    catch(error){
      toast.error(error.data.message || "internal server error")
    }
  }

  const handleDelete = async (blogId)=>{

    try{
     let bol =  window.confirm('Are you sure you want to delete');
     if(bol){
      let {message} = await AxiosService.delete(`${ApiRoutes.DELETE_BLOG_BY_BLOGID.path}/${blogId}`,{authenticate:ApiRoutes.DELETE_BLOG_BY_BLOGID.auth})
      toast.success(message);
      getData();
     }    
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
        myBlogs.map((e,i)=>{
          return (     
            <div className='card-wrapper' key={i}>       
              <MDBCard style={{ width: '40rem',padding:"5px"}}>
                <div className='card-topbar'>
                  <div className='card-topbar-profile'>
                    <img alt="profile" src={profile} height="50px" width="50px" className='profile'/>
                    <h5 className='profile-heading-wrapper fst-italic'>{e.userName?e.userName:'User name'}</h5>
                  </div>
                  <div className="card-topbar-status">
                  {
                      statusText.map((item,index)=>{
                        if(item.status===e.status){
                           return <span key={index} className={`badge rounded-pill bg-${item.variant} text-light`}>{item.status}</span>
                        }
                       
                        })	
                  }
                  </div>
                  <div className="card-topbar-end">
                    <h5 className='profile-heading-wrapper fst-italic'>Delete</h5>
                    <MDBIcon type="button" fas icon="trash" style={{color:"red"}} size='2x'  onClick={()=>{handleDelete(e.blogId)}}/>
                  </div>
                </div>
                <MDBCardImage src={e.image?e.image:placeholder} position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle className="text-center fs-1 fw-bold">{e.title?e.title:"Title Goes Here"}</MDBCardTitle>
                    <MDBCardText className="fs-3 fst-italic">{e.description?e.description:dummyText}</MDBCardText>
                </MDBCardBody>
              </MDBCard>
           </div>
          )  
        })
    }
    
  </div>
  )
}

export default MyBlogs
