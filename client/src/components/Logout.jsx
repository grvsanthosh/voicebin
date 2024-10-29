import React from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import {useNavigate} from 'react-router-dom'
import useLogout from '../hooks/useLogout.jsx'
export default function App() {
    let navigate = useNavigate();
    let logout = useLogout()
  return (
    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='text-white text-center'>
        <h1 className='mb-3'>Logout</h1>
        <h5 className='mb-4'>Do you need to logout?</h5>
        <MDBBtn onClick={()=>{logout()}} className="me-3">YES</MDBBtn>
        <MDBBtn onClick={()=>{navigate('/blogfeeds')}} className="me-1">NO</MDBBtn>            
      </div>
    </div>
  </div>
   
  );
}