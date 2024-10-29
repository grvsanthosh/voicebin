import axios from 'axios'



const axiosService = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers:{
        "content-type": "application/json"
    },
   
})

axiosService.interceptors.request.use((config)=>{
let token = sessionStorage.getItem('token');
let userId = sessionStorage.getItem('userId');
if(token && userId && config.authenticate){
    config.headers.Authorization = `Bearer ${token}`  
}

return config
},(error)=>{
Promise.reject(error)
})

axiosService.interceptors.response.use((response)=>{
    return response.data    

},(error)=>{
    let errorResponse = error.response;
    
   if(errorResponse.status===401){
    sessionStorage.clear()
   }
   
    throw errorResponse
    
  

})

export default axiosService