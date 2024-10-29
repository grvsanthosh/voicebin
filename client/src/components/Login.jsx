import React, {useState,useEffect}from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import axiosService from '../utils/AxiosService.jsx';
import ApiRoutes from '../utils/ApiRoutes.jsx';
import toast from 'react-hot-toast'
import useLogout from '../hooks/useLogout.jsx'
import {useNavigate} from 'react-router-dom'

function Login() {
  let [userName,setUserName] = useState("");
  let [password,setPassword] = useState("");
  let logout = useLogout();
  let navigate = useNavigate()
  const handlesubmit = async()=>{
    try{
      let {message,token,role,userId} = await axiosService.post(ApiRoutes.USER_LOGIN.path,{userName,password},{authenticate:ApiRoutes.USER_LOGIN.auth})
      sessionStorage.setItem('token',token)
      sessionStorage.setItem('role',role)
      sessionStorage.setItem('userId',userId)
      toast.success(message)
      navigate('/blogfeeds')
    }
    catch(error){
      let status = error.status;
      if(status === 401){
        toast.error(error.data.message || "internal server error")
      }
      setTimeout(()=>{window.location.assign('/home')},2000)
     
    }
  }
  useEffect(()=>{
    logout()
  },[]);
  return (
      <MDBContainer  fluid>
      <MDBRow  className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-mixedcase" style={{cursor:"pointer"}} onClick={()=>{navigate('/home')}}>VoiceBin</h2>
              <p className="text-white-50 mb-5">Let the world listen to you...</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='User name' id='formControlLg' type='username' size="lg" onChange={(e)=>{setUserName(e.target.value)}}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={(e)=>{setPassword(e.target.value)}}/>

              <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handlesubmit}>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='facebook-f' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='twitter' size="lg"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                  <MDBIcon fab icon='google' size="lg"/>
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a style={{cursor:"pointer"}} className="text-white-50 fw-bold" onClick={()=>{navigate('/signup')}}>Sign Up</a></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    
  )
  
}

export default Login
