import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

    
    

const AddNews = () => {

    const [titel, setTitel] = useState('');
    const [teaser, setTeaser] = useState('');
    const [nyhedstekst, setNyhedstekst] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

   const handleSubmit = (e) => {
       e.preventDefault();

       const formData = new FormData();
        formData.append('titel', titel);
        formData.append('teaser', teaser);
        formData.append('nyhedstekst', nyhedstekst);
        formData.append('image', image);

        Axios.post('http://localhost:5033/nyheder/admin', formData, {withCredentials:true})
            .then(_res => {
                setRedirect(true);

                alert('Du har nu tilføjet en nyhed')
            })
   }

   if (redirect) {
    return <Redirect to='/admin' />
}

        const handleButton = (e) => {

            e.preventDefault();

            setRedirect(true);

            console.log(handleButton);
        }

    return (
        <>
             <div className="container">

        <h1 className="text-center mb-5 mt-5">Tilføj en nyhed</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail1">

                <Form.Control type="text" defaultValue={titel} required placeholder="Titel..." onChange={(e) => setTitel(e.target.value)} />

                <Form.Text className="text-muted">

                </Form.Text>
            </Form.Group>

            <div className="form-group">

                <textarea type="text" defaultValue={teaser} required onChange={(e) => setTeaser(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder="Teaser.." rows="3"></textarea>
            </div>

            <div className="form-group">

                <textarea type="text" defaultValue={nyhedstekst} required onChange={(e) => setNyhedstekst(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder="Nyheds tekst..." rows="3"></textarea>
                </div>


        <div className="col-lg-12 text-center p-3">
            <Button onClick={handleButton} variant="primary" type="button" className="m-2">
                Fortryd
            </Button>

            <Button variant="primary" type="submit">
                Opret
            </Button>

        </div>


            <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" />

        </Form>
            </div>
        </>
    )
}

export default AddNews;
