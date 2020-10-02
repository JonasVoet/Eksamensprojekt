import React from 'react';


// Icons
import {FaArrowUp} from 'react-icons/fa';
import SearchFunction from '../Search/SearchFunction';

// SCSS
import './Footer.scss';

 const Footer = () => {

   const handleScroll = () => {

       window.scroll({
           top: 0,
           left: 0,
           behavior: 'smooth',
       })
   }

    return (
        <>
            <footer>
                <div className="box1">
                    <div className="icon-box">
                    <FaArrowUp onClick={handleScroll} className="icon" />
                    
                    </div>
                    <h6>bageriet</h6>
                    
                    <p>Fandt du ikke hvad du ledte efter? Så brug gerne vores søge funktion</p>
                    <SearchFunction />
                </div>
               
                <div className="box2">
               Copyright &copy; {new Date().getFullYear()} bageriet aps
                </div>
            </footer>
        </>
    )
}

export default Footer;
