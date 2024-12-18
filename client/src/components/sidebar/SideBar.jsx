import React, {useState} from 'react'
import { Link,useLocation } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { IconContext } from 'react-icons/lib'
import "./SideBar.css"
import { MDBIcon } from 'mdb-react-ui-kit';
import {  IoIosPaper } from "react-icons/io";
import { FaCrown,FaDove,FaEarthAsia,FaUser,FaDoorOpen,FaRegEnvelope,FaSearchengin } from "react-icons/fa6";


const Navbar = () => {

    const [sidebar, setSidebar] = useState(false)
    
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
    let role = sessionStorage.getItem('role')
    let {pathname} = useLocation()
    
    const SideBarData = [  
        {
            title: "World",
            path: "/blogfeeds",
            icon: <FaEarthAsia />,        
            cName: "nav-text",
            cNav: "current-nav",
            role:["User","Admin"]
        },
        {
            title: "Post",
            path: "/createblogs",
            icon: <FaDove />,        
            cName: "nav-text",
            cNav: "current-nav",
            role:["User"]
        },
        {
            title: "My Post",
            path: "/myblogs",
            icon: <FaRegEnvelope />,        
            cName: "nav-text",
            cNav: "current-nav",
            role:["User"]
        },
        {
            title: "Search",
            path: "/searchblogs",
            icon: <FaSearchengin />,        
            cName: "nav-text",
            cNav: "current-nav",
            role:["User"]
        },
        {
            title: "Settings",
            path: "/profilesettings",
            icon: <MDBIcon fas icon="cog" />,        
            cName: "nav-text",
            cNav: "current-nav",
            role:["User"]
        },
        {
            title: "Blog status",
            path: "/blogstatus",
            icon: <IoIosPaper />,
            cName: "nav-text",
            cNav: "current-nav",
            role:["Admin"]
        },     
        {
            title: "Admins",
            path: "/getalladmin",
            icon: <FaCrown />,
            cName: "nav-text",
            cNav: "current-nav",
            role:["Admin"]
        },
        {
            title: "Users",
            path: "/getallusers",
            icon: <FaUser />,
            cName: "nav-text",
            cNav: "current-nav",
            role:["Admin"]
        },
        {
        title: "Logout",
        path: "/logout" ,
        icon: <FaDoorOpen />,        
        cName: "nav-text",
        cNav: "current-nav",
        role:["User","Admin"]
        }   
    ]

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
                         SideBarData.map((item, index) => {
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
