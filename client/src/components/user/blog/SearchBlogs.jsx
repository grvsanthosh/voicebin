import React,{useState,useEffect} from 'react'
import { MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage } from 'mdb-react-ui-kit';
import placeholder from '../../../assets/placeholderImage.jpg';
import profile from '../../../assets/profile.jpg'
import AxiosService from '../../../utils/AxiosService.jsx'
import ApiRoutes from '../../../utils/ApiRoutes.jsx'
import toast from 'react-hot-toast'

function SearchBlogs() {  
  let [searchBlog,setSearchBlog] = useState([])
  let [search,setSearch] = useState("");
  
  const handleSearch = async ()=>{      
    try{
  

      let {data} = await AxiosService.get(`${ApiRoutes.GLOBAL_BLOG_SEARCH.path}/${search}`,{authenticate:ApiRoutes.GLOBAL_BLOG_SEARCH.auth})
      
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


  return (
    <div className="home-wrapper">
      <div className="card-wrapper">
      <div className="input-group">
        <input type="search" style={{color:"black"}} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" 
        onChange={(v)=>{setSearch(v.target.value)}}/>
        <button type="button" style={{backgroundColor:"black",color:"white"}} className="btn btn-outline-dark" data-mdb-ripple-dark
        onClick={handleSearch}>search</button>
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

export default SearchBlogs
