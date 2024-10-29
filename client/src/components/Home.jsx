import React, { useState } from 'react';
import {MDBBtn} from 'mdb-react-ui-kit';
import {useNavigate} from "react-router-dom"
export default function App() {
  let navigate = useNavigate()
  return (
    <header>
    
      <div
        id='intro-example'
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height:"100vh"}}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>VOICEBIN</h1>
              <h5 className='mb-4'>Let the world listen to you...</h5>
              <MDBBtn color='light' outline className="m-2" size="lg" onClick={()=>{navigate('/login')}}>
                LOGIN
              </MDBBtn>            
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}