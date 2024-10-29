import React,{useState,useEffect} from 'react'
import AxiosService from '../../../utils/AxiosService.jsx'
import ApiRoutes from '../../../utils/ApiRoutes.jsx'
import toast from 'react-hot-toast'

function ProfileSettings() {
  let userId = sessionStorage.getItem('userId');
  let [firstName,setFirstName] = useState("");
  let [lastName,setLastName] = useState("");
  let [email,setEmail] = useState("");
  let [mobile,setMobile] = useState("");
  let [userName,setUserName] = useState("");

  const getData = async ()=>{
    try{
      let {data} = await AxiosService.get(`${ApiRoutes.USER_GET_PROFILE.path}/${userId}`,{authenticate:ApiRoutes.USER_GET_PROFILE.auth})
      console.log(data)
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
  const handleEdit = async()=>{
    try{
      let bol =  window.confirm('Do you wish to save your changes');
     if(bol){
      let {data,message} = await AxiosService.put(`${ApiRoutes.USER_EDIT_PROFILE.path}/${userId}`,{firstName,lastName,email,mobile,userName},{authenticate:ApiRoutes.USER_EDIT_PROFILE.auth})
      console.log(data)
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
      toast.error(error.data.message || "internal server error")

    }
  }
  
  useEffect(()=>{
    getData()
  },[])
  return (
    <div>
      <button variant="success" onClick={handleEdit}>Edit</button>
      <button variant="success" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ProfileSettings
