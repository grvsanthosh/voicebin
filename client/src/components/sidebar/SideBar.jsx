import React, {useState} from 'react'
import { Link,useLocation } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons/lib'
import "./SideBar.css"


const Navbar = () => {

    const [sidebar, setSidebar] = useState(false)
    
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
    let role = sessionStorage.getItem('role')
    let {pathname} = useLocation()
    
     return (
         <>
             <IconContext.Provider value={{color: "#fff"}}>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaBars onClick={showSidebar} />  
                </Link>
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul onClick={showSidebar} className='nav-menu-items'>
                    <li className='navbar-toggle'>
                        <Link to="#" className='menu-bars'>
                   <AiOutlineClose />
                        </Link>
                     </li>
                     {
                         SidebarData.map((item, index) => {
                            if(item.role.includes(role) && item.path === pathname){
                             return (
                                        <li key={index} className={item.cNav}>
                                            <Link to={item.path} >                                       
                                                {item.icon} 
                                                <span>
                                                    {item.title}
                                                </span>                                        
                                        </Link>  
                                        </li>
                                     )
                            }
                            else if(item.role.includes(role)){
                                return (
                                        <li key={index} className={item.cName}>
                                        <Link to={item.path} >                                       
                                            {item.icon} 
                                            <span>
                                                {item.title}
                                            </span>                                        
                                    </Link>  
                                    </li>
                                )
                            }
                            else{
                                return <React.Fragment key={index}></React.Fragment>
                            }
                         })
                     }
                </ul>
                 </nav>
            </IconContext.Provider> 
        </>
    )
}

export default Navbar
