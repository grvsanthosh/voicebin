import React,{useState,useEffect} from 'react'
import { MDBInput,MDBIcon} from 'mdb-react-ui-kit';
import toast from 'react-hot-toast'
import AxiosService from '../../../utils/AxiosService.jsx'
import ApiRoutes from '../../../utils/ApiRoutes.jsx'


function GetAllUsers() {
  let [userData,setUserData] = useState([])
  
  const getData = async ()=>{
    try{
      let {data} = await AxiosService.get(ApiRoutes.ADMIN_GET_ALL_USERS.path,{authenticate:ApiRoutes.ADMIN_GET_ALL_USERS.auth})
      let Data = data;
      Data.map((e)=>{
        e.toggle = false
      })
      setUserData(data)
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

  const handleAccessData = async(userid,username)=>{
    try{
      
      let {message} = await AxiosService.put(ApiRoutes.ADMIN_PROVIDE_ADMIN_ACCESS.path,{userid},{authenticate:ApiRoutes.ADMIN_PROVIDE_ADMIN_ACCESS.auth})
      toast.success(message)
      setTimeout(()=>{window.location.assign('/getallusers')},500)
      
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

  const handleToggle = (userid,username,toggleStatus)=>{
    let bol =  window.confirm(`Are you sure you want to grant access to ${username}`);
    if(bol){
    let data = userData.map((e)=>{
      if(e.userId===userid){
        e.toggle = !toggleStatus
      }
      return e
    })
    setUserData(data)
    handleAccessData(userid,username)
  }
    
  }

  useEffect(()=>{getData()},[])
  return (
    <div className='home-wrapper'>
      {
        userData.map((e,i)=>{
          return(
              <div className="form-wrapper" key={i}>
                <div className="create-wrapper">        
                  <MDBInput readonly style={{backgroundColor:"black",color:"white",fontWeight:"bold"}} label="Firstname" id="formControlLg" type="text" size="lg" contrast value={e.firstName}/>
                  <br />
                  <MDBInput readonly style={{backgroundColor:"black",color:"white",fontWeight:"bold"}} label="Lastname" id="formControlLg" type="text" size="lg" contrast value={e.lastName}/>
                  <br />
                  <MDBInput readonly style={{backgroundColor:"black",color:"white",fontWeight:"bold"}} label="Username" id="formControlLg" type="text" size="lg" contrast value={e.userName}/>        
                  <br />
                  <MDBInput readonly style={{backgroundColor:"black",color:"white",fontWeight:"bold"}} label="Role" id="formControlLg" type="text" size="lg" contrast value={e.role}/>        
                  <br />
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="me-2 pt-1">Grant Admin access</h5>
                        {                        
                          (!e.toggle)?<MDBIcon className="me-4" type="button" fas icon="toggle-off"  size='2x' onClick={()=>{
                          handleToggle(e.userId,e.userName,e.toggle)
                          }}/>:<MDBIcon className="me-4" type="button" fas icon="toggle-on"  size='2x'/>
                        }
                    </div>
                  </div>
                </div>
              </div>
          )
        })
      }
    </div>
  )
}

export default GetAllUsers
