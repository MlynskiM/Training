import React from "react";


const currentDate = new Date ();
const year = currentDate.getFullYear();


function Footer(){
    return  (
    <footer>
        <h1>Copyright ⓒ {year}</h1>
    </footer>
);

}


export default Footer;