import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';



 const Navigation = () => {

    const [color, setColor] = useState('');
    const  changeColor = color => {
        setColor(color)
      };


    return (
        <>
       <Navbar id="nav" variant="light" expand={"xl"} style={{ background: color,  important: 'true' }} >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">

                    <NavLink className="nav-link" exact to="/"   onClick={() =>  changeColor("none")} >FORSIDE</NavLink>

                    <NavLink className="nav-link" to="/produkter" onClick={() =>  changeColor("#648ba7")}>PRODUKTER</NavLink>

                    <span className="brand"><NavLink className="nav-link" to="/" onClick={() =>  changeColor("none")}>bageriet</NavLink></span>
                   
                    <NavLink className="nav-link" to="/contact" onClick={() =>  changeColor("#648ba7")}>KONTAKT</NavLink>
                    <NavLink className="nav-link" to="/login" onClick={() =>  changeColor("#648ba7")}>LOGIN</NavLink>

                </Nav>

            </Navbar.Collapse>

        </Navbar>
        </>
    )
}



export default withRouter(Navigation);
