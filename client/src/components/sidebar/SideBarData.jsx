import React from 'react'
import {   FaCartPlus, FaEnvelopeOpenText } from 'react-icons/fa'
import {  AiFillHome } from 'react-icons/ai'
import {  IoIosPaper, IoMdHelpCircle, IoMdPeople } from "react-icons/io"



export const SidebarData = [
  
    {
        title: "World",
        path: "/blogfeeds" ,
        icon: <AiFillHome />,        
        cName: 'nav-text',
        cNav: 'current-nav',
        role:["User", "Admin"],
    },
    {
        title: "Post",
        path: "/createblogs" ,
        icon: <AiFillHome />,        
        cName: 'nav-text',
        cNav: 'current-nav',
        role:["User"]
    },
    {
        title: "My Post",
        path: "/myblogs" ,
        icon: <AiFillHome />,        
        cName: 'nav-text',
        cNav: 'current-nav',
        role:["User"]
    },
    {
        title: "Search",
        path: "/searchblogs" ,
        icon: <AiFillHome />,        
        cName: 'nav-text',
        cNav: 'current-nav',
        role:["User"]
    },
    {
        title: "Settings",
        path: "/profilesettings" ,
        icon: <AiFillHome />,        
        cName: 'nav-text',
        cNav: 'current-nav',
        role:["User"]
    },

    {
        title: "Approve",
        path: "/approveblogs" ,
        icon: <IoIosPaper />,
        cName: 'nav-text',
        cNav: 'current-nav',
        role:["Admin"]
    },
    {
        title: "Logout",
        path: "/logout" ,
        icon: <AiFillHome />,        
        cName: 'nav-text',
        cNav: 'current-nav',
        role:["User", "Admin"],
    }
   
]
