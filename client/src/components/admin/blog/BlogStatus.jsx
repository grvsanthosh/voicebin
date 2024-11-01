import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import AxiosService from '../../../utils/AxiosService.jsx'
import ApiRoutes from '../../../utils/ApiRoutes.jsx'
import { MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBIcon } from 'mdb-react-ui-kit';
import placeholder from '../../../assets/placeholderImage.jpg';
import profile from '../../../assets/profile.jpg'

function BlogStatus() {
  let [searchBlog,setSearchBlog] = useState([])
  let [status,setStatus] = useState("Pending");
  let [search,setSearch] = useState("");
  let [blogId,setBlogId] = useState("");
  let [statusAction,setStatusAction] = useState("");
  let statusText = [
    {
        status:"Approved",
        variant:"success",
        icon1:{ value:"hand-paper",
                action:"Pending",
                style:{
                color:"orange",
                marginRight:"10px"
               }        
        },
        icon2:{ value:"times",
                action:"Rejected",
                style:{
                  color:"red",
                  marginRight:"10px"
                }        
        }
        
    },
    {
        status:"Pending",
        variant:"warning",
        icon1:{ value:"check",
                action:"Approved",
                style:{
                  color:"green",
                  marginRight:"10px"
                }         
        },
        icon2:{ value:"times",
                action:"Rejected",
                style:{
                  color:"red",
                  marginRight:"10px"
                }         
        }
    },
    {
        status:"Rejected",
        variant:"danger",
        icon1:{ value:"check",
                action:"Approved",
                style:{
                  color:"green",
                  marginRight:"10px"
                }         
        },
        icon2:{ value:"hand-paper",
                action:"Pending",
                style:{
                  color:"orange",
                  marginRight:"10px"
                }        
        }
    }
]
  
  const getSearchData = async ()=>{
    try{
      
        let {data} = await AxiosService.get(`${ApiRoutes.ADMIN_GET_ALL_BLOGS.path}/${status}/${search}`,{authenticate:ApiRoutes.ADMIN_GET_ALL_BLOGS.auth})
        setSearchBlog(data)
        
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

  const getStatusData = async ()=>{
    
    try{
      
        let {data} = await AxiosService.get(`${ApiRoutes.FETCH_BLOG_BY_STATUS.path}/${status}`,{authenticate:ApiRoutes.FETCH_BLOG_BY_STATUS.auth})
        setSearchBlog(data)
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

  const handleStatusChange = async (blog,status)=>{
        
    try{     
      let {message} = await AxiosService.put(ApiRoutes.ADMIN_APPROVE_BLOGS.path,{blogId:blog,status:status},{authenticate:ApiRoutes.ADMIN_APPROVE_BLOGS.auth})
      
      toast.success(message)
      setTimeout(()=>{window.location.assign('/blogstatus')},2000)
      
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


  useEffect(()=>{getStatusData()},[status])

  const handlechange = (val)=>{
    
    setStatus(val.target.value)
  
  }


  return (
    
    <div className="home-wrapper">
      <div className="searchbar-wrapper">
        <select value={status}  
            onChange={handlechange} className='dropdown'>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
        </select>      
        <div className="input-group">
          <input type="search" style={{color:"black"}} className="form-control rounded" placeholder="Search content" aria-label="Search" aria-describedby="search-addon" 
          onChange={(v)=>{setSearch(v.target.value)}}/>
          <button type="button" style={{backgroundColor:"black",color:"white"}} className="btn btn-outline-dark" data-mdb-ripple-dark
          onClick={getSearchData}>search</button>
        </div>  
      </div>
      {
        searchBlog.map((e,i)=>{
          return (
            <div className='card-wrapper' key={i}>
              <MDBCard style={{ width: '40rem',padding:"5px"}}>
                  <div className='card-topbar'>
                      <div className='card-topbar-profile'>
                          <img alt="profile" src={profile} height="50px" width="50px" className='profile'/>
                          <h5 className='profile-heading-wrapper fst-italic'>{e.userName?e.userName:'User name'}</h5>
                      </div>
                      {/* status */}
                      
                        {
                            statusText.map((item,index)=>{
                              if(item.status===e.status){
                                return <div key={index} className="card-topbar-status">
                                          <span  className={`badge rounded-pill bg-${item.variant} text-light`}>{item.status}</span>
                                          <div className="card-topbar-end">
                                              <h5 style={{color:"black",fontSize:"36px",fontWeight:"bold",padding:"10px",textAlign:"center"}}>Action</h5>
                                              
                                              <MDBIcon type="button" fas icon={item.icon1.value} style={item.icon1.style} size='2x'
                                              onClick={()=>{handleStatusChange(e.blogId,item.icon1.action)}} />
                                              <MDBIcon type="button" fas icon={item.icon2.value} style={item.icon2.style} size='2x' 
                                              onClick={()=>{handleStatusChange(e.blogId,item.icon2.action);
                                                }}/>                              
                                          </div>
                                       </div>


                              }
                            
                              })	
                        }
                      {/* status */}
                    
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

export default BlogStatus
