import React from 'react'
import placeholder from '../../assets/placeholderImage.jpg';
import profile from '../../assets/profile.jpg'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
  } from 'mdb-react-ui-kit';
function Post({image,title,description,userName}) {
    let dummyText = "Your sample description for this post is here."
    return(
        <div className='card-wrapper'>
            <MDBCard style={{ width: '40rem',padding:"5px"}}>
                <div className='card-topbar'>
                    <div className='card-topbar-profile'>
                        <img alt="profile" src={profile} height="50px" width="50px" className='profile'/>
                        <h5 className='profile-heading-wrapper fst-italic'>{userName?userName:'User name'}</h5>
                    </div>
                </div>                
                <MDBCardImage src={image?image:placeholder} position='top' alt='...' />
                    <MDBCardBody>
                            <MDBCardTitle className="text-center fs-1 fw-bold">{title?title:"Title Goes Here"}</MDBCardTitle>
                            <MDBCardText className="fs-3 fst-italic">{description?description:dummyText}</MDBCardText>                            
                    </MDBCardBody>
            </MDBCard>
        </div>
    )
    
}
export default Post