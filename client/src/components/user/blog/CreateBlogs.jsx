import React,{useState} from 'react'
import { MDBInput,MDBTextArea,MDBFile,MDBBtn} from 'mdb-react-ui-kit';
import toast from 'react-hot-toast'
import Post from '../../helper/Post.jsx'
import AxiosService from '../../../utils/AxiosService.jsx';
import ApiRoutes from '../../../utils/ApiRoutes.jsx';
import {useNavigate} from 'react-router-dom'
function CreateBlogs() {
  const allowedExtensions = ['png', 'jpg', 'jpeg'];
  let [title,setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let navigate = useNavigate();
  const handlesubmit = async() => {
    try{
      let {message} = await AxiosService.post(ApiRoutes.USER_CREATE_BLOG.path,{title,description,image},{authenticate:ApiRoutes.USER_CREATE_BLOG.auth})
      toast.success(message)
      navigate('/myblogs');
    }
    catch(error){
      if(error.status===413){
        toast.error("Image size is too large. Please choose an image less than 2MB")
        
      }
      else if(error.status===401){
        toast.error(error.data.message || "internal server error")
        setTimeout(()=>{window.location.assign('/home')},2000)
      }
      else{
        toast.error(error.data.message || "internal server error")
      
      }
    
    }
  }
  const fileHandle = (e)=>{
    let selectedFile = e.target.files[0]
    if(validateExtension(selectedFile.name)){
      const reader = new FileReader()
      reader.readAsDataURL(selectedFile)
      reader.onloadend = () => {
        setImage(reader.result)
      }
      // setImage(objUrl)
    }
    else{
    toast.error(`Only ${allowedExtensions.join(' / ')} are supported`)
    }

  }
   
  const validateExtension = (filename) => {   
    const extension = filename.split('.')[filename.split('.').length - 1]
    return allowedExtensions.includes(extension)
  }

  

return (
    <div className="form-wrapper">
    <div className="create-wrapper">
      <MDBInput label="Title" id="formControlLg" type="text" size="lg" contrast onChange={(e)=>{setTitle(e.target.value)}}/>
      <br />
      <MDBTextArea label="Description" id="textAreaExample" rows="{20}" contrast onChange={(e)=>{setDescription(e.target.value)}} />
      <br />
      <h5>Choose your image to post...</h5>
      <MDBFile label='Default file input example' id='customFile' onChange={fileHandle}/>
      <br />
      <MDBBtn outline rounded color='white' onClick={handlesubmit}>
        Post
      </MDBBtn>
    </div>
    <h2 style={{marginTop: "10px",marginBottom:"10px", color:"black"}}>
      PREVIEW
    </h2>
    <Post image={image} title={title} description={description}/>
    </div>
  )
}

export default CreateBlogs
