import react from 'react'
import { links } from '../data'



const Navbar = ()=>{
    return(
        <div className='links-container'>
        <ul className='links' >
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
    );
}

export default Navbar;