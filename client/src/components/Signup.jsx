import React,{useState,useEffect} from 'react'
import AxiosService from '../utils/AxiosService.jsx'
import ApiRoutes from '../utils/ApiRoutes.jsx'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

function Signup() {
  let [firstName, setFirstName] = useState("Santhosh");
  let [lastName, setLastName] = useState("Elumalai");
  let [email, setEmail] = useState("grvsanthosh@gmail.com");
  let [userName, setUserName] = useState("sdflei");
  let [password, setPassword] = useState("admin123");
  let [mobile, setMobile] = useState("9176586636");

  

  let signupAccount = async()=>{
    try{
      let {message} = await AxiosService.post(ApiRoutes.USER_SIGNUP.path,{firstName,lastName,email,userName,password,mobile},{authenticate:ApiRoutes.USER_SIGNUP.auth})
      toast.success(message)
      setTimeout(()=>{window.location.assign('/login')},2000)

    }
    catch(error){
      
      toast.error(error.data.message || "internal server error")
    }
  }
  
  return (
    <div>
            <button variant="success" onClick={()=>{signupAccount()}}>Signup</button>

    </div>
  )
}

export default Signup
