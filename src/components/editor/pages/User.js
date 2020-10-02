import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Redirect, Link } from 'react-router-dom';
import {Button, Modal, Spinner} from 'react-bootstrap';

// Icons
import { FaPen, FaMinusCircle } from 'react-icons/fa';

// SCSS
import './User.scss';

 const User = () => {

     const [user, setUser] = useState();
     const [redirect, setRedirect] = useState(false);

     // Edit user
     const [brugernavn, setBrugernavn] = useState('');
     const [fornavn, setFornavn] = useState('');
     const [efternavn, setEfternavn] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     //Get comments
     const [comments, setComments] = useState();
     
    // Modal
     const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    // Comments
    useEffect(() => {
        Axios.get('http://localhost:5033/kommentar/bruger/' + localStorage.getItem('userid'))
        .then(res => {
            setComments(res.data);
            console.log(res.data);
        })
       
    }, []);

    // User
    useEffect(() => {
        Axios.get('http://localhost:5033/bruger/admin/' + localStorage.getItem('userid'), {withCredentials:true})
        .then(res => {
            console.log(res.data);
            setUser(res.data);

        });

    }, []);

    if (redirect) {
        return <Redirect to='/' />
    }

    // Logout
    const handleLogout = () => {
        const r = window.confirm('Sikker på du vil logge ud?');

        if (r === true) {
            Axios.get('http://localhost:5033/login/logout', {withCredentials:true});
            setRedirect(true);
            localStorage.removeItem('userid');
            localStorage.removeItem('role');
        } else {
            return;
        }
    }

    // Edit user
    const handleEditUser = (e) => {
        
            e.preventDefault();
            Axios.put('http://localhost:5033/bruger/admin/' + localStorage.getItem('userid'),  {brugernavn, fornavn, efternavn, email, password}, {withCredentials:true})
                .then(res => {
                    console.log(res);
                    window.location.reload();
                    
                })
                .catch((error) => console.log( error.response ) );
    }

    // Delete user
    const handleDeleteUser = (e) => {

        const r = window.confirm('Sikker på du vil slette din profil? Du kan ikke få den tilbage!');

        if (r === true) {
            e.preventDefault();
        Axios.delete('http://localhost:5033/bruger/admin/' + localStorage.getItem('userid'), {withCredentials:true})
        .then(res => {
            console.log(res);
            localStorage.removeItem('userid');
            setRedirect(true);
        })
        } else {
            return;
        } 
    }

    // Delete comment 
    const handleDelete = (id) => {
        if (window.confirm('Sikker på du vil slette denne kommentar')) {
            Axios.delete('http://localhost:5033/kommentar/admin/' + id, {withCredentials: true})
            .then(res => {
                console.log(res);
                window.location.reload();
            });
        }
    }

    const commentList = comments ? (
        comments.map(comment => {
            return (

                <tr key={comment._id}>
                <th scope="row">{comment.oprettet}</th>
                <td>{comment.kommentaren}</td>
                <td><Link to={`/editcomment/${comment._id}`}><FaPen/></Link></td>
                <td>
                    <FaMinusCircle onClick={() => handleDelete(comment._id)}/>
                    </td>

            </tr>

            )
        })
    ) : (

        <tr className="container spinner"> 
            <td><h4 id="heading-error">Kontakter databasen.. Bliv endelig hængende</h4>
            </td>
            <Spinner animation="border" role="status"></Spinner></tr>
    );
    
    
    return (
        <>
           <main className="main">
            
            <section className="profile-page">
                <div className="container">
                
                    <h2>Din Profil</h2>
                    <p className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus consectetur saepe repudiandae. Aliquam ab ratione aperiam accusamus? Deserunt iure, non mollitia voluptate quo facere modi odit earum nostrum nemo praesentium?</p>
                    {user != null ?
                    <div className="profile">
                        
                   
                      <h4><span>Medlemsrolle:</span> {user.rolle}</h4>  
                      <h4><span>Dit bruger ID:</span> {user._id}</h4>
                      <h4><span>Brugernavn:</span> {user.brugernavn}</h4>
                      <h4><span>Fornavn:</span> {user.fornavn}</h4>
                      <h4><span>Efternavn:</span> {user.efternavn}</h4>
                      <h4><span>Email:</span> {user.email}</h4>
                      <button onClick={handleLogout} className="button-logout">Logud</button>
                    
                <div className="modal-container">
                    
                <Button onClick={handleShow}>
                   Rediger din profil
                </Button>
                <br />
                
                
                <button onClick={handleDeleteUser} id="delete">Slet din profil</button>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Rediger din profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <form onSubmit={handleEditUser} className="editer-form">
                    <input type="text" placeholder={user.brugernavn} required onChange={(e) => setBrugernavn(e.target.value)} />

                    <input type="text" placeholder={user.fornavn} required onChange={(e) => setFornavn(e.target.value)} />

                    <input type="text" placeholder={user.efternavn} required onChange={(e) => setEfternavn(e.target.value)} />

                    <input type="email" placeholder={user.email} required onChange={(e) => setEmail(e.target.value)} />
                    
                    <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Bekræft</button>
                </form>

                </Modal.Body>
                </Modal>
                
                </div>
                    </div>
                : "Loading..." }       
                   
                </div>
                <div className="container">
                    <h2 className="text-center">Dine kommentare</h2>
                  <table className="table">
                  <thead>
                    <tr>
                        <th className="heading" scope="col">Oprettet</th>
                        <th className="heading" scope="col">Kommentaren</th>
                        
                        
                    </tr>

                    <tr>

                        {/* <th className="heading" scope="col"> <Link to="/addnews"><FaPlusCircle /></Link>Tilføj Nyhed</th> */}
                    </tr>

                </thead>
                <tbody>
                    {commentList}
                </tbody>
                  </table>
                </div>
                </section>
            </main>
           
        </>
    )
}

export default User;
