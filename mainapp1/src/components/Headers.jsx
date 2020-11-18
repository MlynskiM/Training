import React , { useState} from 'react';
import logo from '../components/logoMM.png'
import Main from './Main';
import Navbar from './navbar'
import { links } from '../data'


const Link = ()=> {
  const [isActive, setActive]= useState('false')

  const handleToggle = ()=>{
      setActive(!isActive);
    };
 
    return(<div>
    <div className={`container ${isActive ? "" : "active"}`}>
    <div className="navbar">
      <div className="menu">
        <h3 className="logo"><img src={logo}/></h3>
        
        <div className="hamburger-menu"onClick={handleToggle}>
        
          <div className="bar" ></div>
          
        </div>
      </div>
    </div>
      <Main/>
      <Navbar/>
  
  </div>
  <div className="container-mobilelinks" >
      <ul className='linkss' >
              {links.map((link) => {
                const { id, url, text } = link;
                return (
                  <li key={id}>
                    <a href={url}>{text}</a>
                  </li>
                );
              })}
            </ul>
            </div>
   </div>
    )
};

export default Link;
