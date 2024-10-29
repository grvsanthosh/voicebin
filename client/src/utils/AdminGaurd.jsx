import React from 'react'
import {Navigate} from 'react-router-dom'
function AdminGaurd({children}) {
 let role = sessionStorage.getItem('role')
 return role === true?children:<Navigate to='/login'/>
}

export default AdminGaurd