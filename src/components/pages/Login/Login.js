import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// SCSS
import './Login.scss';


 const Login = () => {

    // Login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [redirectAdmin, setRedirectAdmin] = useState(false);
    const [show, setShow] = useState(false);

    // Register
    const [brugernavn, setBrugernavn] = useState('');
    const [fornavn, setFornavn] = useState('');
    const [efternavn, setEfternavn] = useState('');
    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Login handle
  const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5033/login/login', {email, password}, {withCredentials:true})
        .then(res => {
            console.log(res.data);
            localStorage.setItem("userid", res.data.bruger_id);
            localStorage.setItem("role", res.data.rolle);

            if (res.data.rolle === "ADMIN") {
                setRedirectAdmin(true);
            } else {
                setRedirect(true);
            }
        })
  }

  if (redirectAdmin) {
      return <Redirect to={'/admin/'} />
  }

  if (redirect) {
    return <Redirect to={'/user/'} />
}



  // Register handle
  const handleRegisterSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:5033/bruger', {brugernavn, fornavn, efternavn, email, password})
        .then(res => {
            console.log(res.data);
            
        });

        alert('Velkommen til vores lille familie');
  };


    return (
        <>
        <Helmet>
                <title>Bageriet - Login</title>
                <meta name="description" content="Her kan du logge ind og oprette en bruger" />
            </Helmet>
          <main className="main">
            <div className="container text-center">
              <div className="section-form">
                  <h1>bageriet</h1>
                <form onSubmit={handleSubmit} className="form">
                    <input type="email" required placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
                    <br />
                    <input type="password" required placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button className="login-btn" type="submit">LOGIN</button>
                </form>

                <div className="modal-container">
                <Button onClick={handleShow}>
                    Opret dig
                </Button>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>bageriet</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <form onSubmit={handleRegisterSubmit} className="register-form">
                    <input value={brugernavn} type="text" placeholder="Brugernavn..." onChange={(e) => setBrugernavn(e.target.value)} />
                    <input type="text" value={fornavn} placeholder="Fornavn..." onChange={(e) => setFornavn(e.target.value)} />
                    <input type="text" value={efternavn} placeholder="Efternavn..." onChange={(e) => setEfternavn(e.target.value)} />
                    <input type="email" value={email} placeholder="E-mail..." onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" value={password} placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <button type="submit">Opret</button>
                </form>

                </Modal.Body>
                </Modal>
                <p>Glemt password?</p>
                </div>
              </div>
            </div>
         </main>
        </>
    )
}

export default Login;
