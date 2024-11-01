import React,{useState,useEffect} from 'react'
import { MDBInput,MDBBtn} from 'mdb-react-ui-kit';
import AxiosService from '../../../utils/AxiosService.jsx'
import ApiRoutes from '../../../utils/ApiRoutes.jsx'
import toast from 'react-hot-toast'
import { MdDelete } from "react-icons/md";
import { LuSave } from "react-icons/lu";

function ProfileSettings() {
  let userId = sessionStorage.getItem('userId');
  let [firstName,setFirstName] = useState("");
  let [lastName,setLastName] = useState("");
  let [userName,setUserName] = useState("");
  let [email,setEmail] = useState("");
  let [mobile,setMobile] = useState("");

  const getData = async ()=>{
    try{
      let {data} = await AxiosService.get(`${ApiRoutes.USER_GET_PROFILE.path}/${userId}`,{authenticate:ApiRoutes.USER_GET_PROFILE.auth})
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setMobile(data.mobile);
      setUserName(data.userName);
    }
    catch{
      toast.error(error.data.message || "internal server error")
    }
  }
  const handleSave = async()=>{
    try{
      let bol =  window.confirm('Do you wish to save your changes');
     if(bol){
      let {data,message} = await AxiosService.put(`${ApiRoutes.USER_EDIT_PROFILE.path}/${userId}`,{firstName,lastName,email,mobile,userName},{authenticate:ApiRoutes.USER_EDIT_PROFILE.auth})
      console.log(data)
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setMobile(data.mobile);
      setUserName(data.userName);
      toast.success(message);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('role');
      setTimeout(()=>{window.location.assign('/home')},2000)
    }
    }
    catch(error){
      toast.error(error.data.message || "internal server error")

    }
  }

  const handleDelete = async()=>{
    try{
     let bol =  window.confirm('Are you sure you want to delete');
     if(bol){
      let {message} = await AxiosService.delete(`${ApiRoutes.USER_REMOVE_ACCOUNT.path}/${userId}`,{authenticate:ApiRoutes.USER_REMOVE_ACCOUNT.auth})
      toast.success(message);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('role');
      setTimeout(()=>{window.location.assign('/home')},2000)
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
    <div className="form-wrapper">
      <div className="create-wrapper">        
        <MDBInput label="Firstname" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setFirstName(e.target.value)}} 
        value={firstName}/>
        <br />
        <MDBInput label="Lastname" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setLastName(e.target.value)}} 
        value={lastName}/>
        <br />
        <MDBInput label="Username" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setUserName(e.target.value)}} 
        value={userName}/>        
        <br />
        <MDBInput label="Email" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setEmail(e.target.value)}} 
        value={email}/>
        <br />
        <MDBInput label="Mobile" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setMobile(e.target.value)}} 
        value={mobile}/>
        <br />
        <div className="d-flex justify-content-center">
          <MDBBtn outline rounded color='white' onClick={handleSave} className="me-3">
            <LuSave size={30}/>
          </MDBBtn>
          <MDBBtn outline rounded color='white' onClick={handleDelete} >
          <MdDelete size={30}/>
          </MDBBtn>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
