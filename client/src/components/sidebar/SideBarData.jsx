import React from 'react'
import { MDBIcon } from 'mdb-react-ui-kit';
import {  IoIosPaper } from "react-icons/io";
import { FaCrown,FaDove,FaEarthAsia,FaUser,FaDoorOpen,FaRegEnvelope,FaSearchengin } from "react-icons/fa6";


export const SideBarData = [  
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
