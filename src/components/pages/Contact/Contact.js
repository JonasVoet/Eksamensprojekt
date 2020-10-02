import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

// SCSS
import './contact.scss';

// Image
import mapImg from '../../../images/contactmap.jpg';

 const Contact = () => {

    const [navn, setNavn] = useState('');
    const [email, setEmail] = useState('');
    const [emne, setEmne] = useState('');
    const [besked, setBesked] = useState('');

    // Contact form handle

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5033/kontakt', {navn, email, emne, besked})
            .then(res => {
                console.log(res);
                alert('Din besked er sendt! Vi vil besvare den hurtigst muligt.');

                window.location.reload();
            });
    };

    return (
        <>
        <Helmet>
                <title>Bageriet - Kontakt</title>
                <meta name="description" content="Bageriet - Øster Uttrupvej 1 9200 Aalborg, +45 26 95 40" />
            </Helmet>
            <main className="main">
            <section className="contact">
                    <div className="container">
                        <h2>Kontakt os</h2>
                        <p className="info">Hvis du har nogle spørgsmål, har brug for hjælp, eller har ideer til nye produkter, er du velkommen til at kontakte os</p>

                    <div className="flex-container">
                        <form onSubmit={handleSubmit} className="form">

                            <input type="text" required placeholder="&nbsp;&nbsp;Dit navn..." onChange={(e) => setNavn(e.target.value)}/>

                            <input type="email" required placeholder="&nbsp;&nbsp;Din e-mail..." onChange={(e) => setEmail(e.target.value)}/>

                            <input type="text" required placeholder="&nbsp;&nbsp;Emne..." onChange={(e) => setEmne(e.target.value)}/>

                            <textarea placeholder="&nbsp;&nbsp;Din besked..." cols="40" rows="6" onChange={(e) => setBesked(e.target.value)}></textarea>
                            <br />
                            <button className="button">Send</button>
                        </form>

                        <aside className="map">
                            <div className="text">
                            <p><span>Adresse:</span> Øster Uttrupvej 1 9200 Aaalborg</p>
                            <p><span>Telefon:</span> +45 26 95 40</p>
                            </div>
                           
                            <div className="img">
                                <img src={mapImg} className="img-fluid" alt="adresse på kort"/>
                            </div>
                        </aside>

                    </div>


                    </div>
                </section>
            </main>
        </>
    )
}

export default Contact;
