import React,{useState} from 'react'
import AxiosService from '../utils/AxiosService.jsx'
import {useNavigate} from 'react-router-dom'
import ApiRoutes from '../utils/ApiRoutes.jsx'
import toast from 'react-hot-toast'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from 'mdb-react-ui-kit';

function Signup() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [mobile, setMobile] = useState("");
  let navigate = useNavigate()

  let signupAccount = async()=>{
    try{
      let {message} = await AxiosService.post(ApiRoutes.USER_SIGNUP.path,{firstName,lastName,email,userName,password,mobile},{authenticate:ApiRoutes.USER_SIGNUP.auth})
      toast.success(message)
      setTimeout(()=>{window.location.assign('/login')},2000)
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
        <div className="form-wrapper">
          <div style={{marginTop:"30px",marginBottom:"10px"}}> 
            <h2 className="fw-bold mb-2 text-mixedcase" style={{cursor:"pointer",color:"black"}} onClick={()=>{navigate('/home')}}>VoiceBin</h2>
          </div>
          <p className="text-white mb-5">Let the world listen to you...</p>
          <div className="create-wrapper">        
            <MDBInput label="Firstname" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setFirstName(e.target.value)}} 
            value={firstName}/>
            <br />
            <MDBInput label="Lastname" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setLastName(e.target.value)}} 
            value={lastName}/>
            <br />
            <MDBInput label="Username" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setUserName(e.target.value)}} 
            value={userName}/>        
            <br /><MDBInput label="Password" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setPassword(e.target.value)}} 
            value={password}/>        
            <br />
            <MDBInput label="Email" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setEmail(e.target.value)}} 
            value={email}/>
            <br />
            <MDBInput label="Mobile" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setMobile(e.target.value)}} 
            value={mobile}/>
            <br />
            <div className="d-flex justify-content-center">
              <MDBBtn outline rounded color='white' onClick={signupAccount} className="me-3">
                SUBMIT
              </MDBBtn>
            </div>
          </div>
      </div>
       
  )
}

export default Signup
