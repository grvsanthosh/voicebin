import React from 'react'
import {Navigate} from 'react-router-dom'
function UserGaurd({children}) {
 let role = sessionStorage.getItem('role')
 return role === 'User'?children:<Navigate to='/login'/>
 
}

export default UserGaurd
