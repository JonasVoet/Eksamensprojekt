import React, {useContext, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';


// Context
import DbContext from '../../context/DbContext';

// SCSS
import './Home.scss';

// Icons
import {FaRegEnvelope, FaRegEnvelopeOpen, FaComments} from 'react-icons/fa';

// Slider images
import slide1 from '../../../images/slide1.jpg';
import slide2 from '../../../images/slide2.jpg';
import slide3 from '../../../images/slide3.jpg';


 const Home = () => {

    // News
    const [news, setNews] = useState();
    const context = useContext(DbContext);

    useEffect(() => {
        context.getNews().then(res => setNews(res));
    }, [context]);

    // Newsletter
    const [email, setEmail] = useState('');
    const myForm = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

       axios.post('http://localhost:5033/nyhedsbrevtilmelding/', {email})
       .then(res => {
        //    console.log(res);
           alert('Du er nu tilmeldt vores Nyhedsbrev');
       })

        myForm.current.reset();
    }

    // Products
    const [products, setProducts] = useState();
    
    useEffect(() => {
        context.getProducts().then(res => setProducts(res));
    }, [context]);


    return (
        <>
        <Helmet>
                <title>Bageriet - Forside</title>
                <meta name="description" content="Her kan du se nyheder, produkter, og du kan tilmelde nyhedsbrev" />
            </Helmet>
            <main>
                <div className="container-fluid">
                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <h1 className="slider-text">Vi elsker at lave brød</h1>
                            <img className="d-block w-100" src={slide1} alt="Vi elsker at lave brød"></img>
                        </div>
                        <div className="carousel-item">
                            <h1 className="slider-text">Vi elsker at lave brød</h1>
                            <img className="d-block w-100" src={slide2} alt="Vi elsker at lave brød"></img>
                        </div>
                        <div className="carousel-item">
                        <h1 className="slider-text">Vi elsker at lave brød</h1>
                        <img className="d-block w-100" src={slide3} alt="Vi elsker at lave brød"></img>
                        </div>
                    </div>
                         <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                        </div>
                        </div>
                       
                        <section className="articles-section">
                            
                            <div className="container">
                            
                                <h2>Vi skaber lækkert! brød</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus consectetur saepe repudiandae. Aliquam ab ratione aperiam accusamus? Deserunt iure, non mollitia voluptate quo facere modi odit earum nostrum nemo praesentium?</p>
                          <article className="articles">
                            <div className="boxes">
                            {news != null ?
                                news.map(news => (
                                <div key={news._id} className="box">
                                    <img src={`http://localhost:5033/images/${news.image}`} alt="article 1"/>
                                    <h3>{news.titel}</h3>
                                    <p>{news.teaser}</p>
                                    </div>

                                ))
                                : <div className="container spinner"> 
                                    <div><h4 id="heading-error">Kontakter databasen.. Bliv endelig hængende</h4></div>
                                    <Spinner animation="border" role="status"></Spinner></div>}
                                    </div>
                                </article>
                            </div>
                        </section>

                        <section className="newsletter container-fluid">
                            <div className="text-box">
                            <h4>Tilmeld dig vores nyhedsbrev</h4>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima dolorum nostrum a.</p>
                            </div>
                            <form ref={myForm} onSubmit={handleSubmit} className="form">
                                <div className="icon">
                                <FaRegEnvelope className="mail icon-unlock" />
                                <FaRegEnvelopeOpen className="mail icon-lock" />
                                </div>
                                <input required type="email" placeholder="Indtast din email..." onChange={(e) => setEmail(e.target.value)}/>
                                <button className="button" type="submit">TILMELD</button>
                            </form>
                        </section>

                        <section className="products">
                            <div className="container">
                                <h2>Nyeste bagværk</h2>
                                <p className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus consectetur saepe repudiandae. Aliquam ab ratione aperiam accusamus? Deserunt iure, non mollitia voluptate quo facere modi odit earum nostrum nemo praesentium?</p>
                               
                               <div className="products">
                               {products != null ?
                               products.map(product => (
                                   <div key={product._id} className="box">
                                       <img src={`http://localhost:5033/images/${product.image}`} alt=""/>
                                        <div className="comments">
                                        <p>{product.kommentar.length}</p>
                                        <FaComments className="icon"/>
                                    </div>
                                    <h5>{product.titel}</h5>
                                    <p>{product.teaser}</p>
                                    <Link to={'/product/' + product._id}>
                                    <button className="read-more">LÆS MERE</button>
                                    </Link>
                                   </div>

                                ))
                                : <div className="container spinner"> 
                                    <div><h4 id="heading-error">Kontakter databasen.. Bliv endelig hængende</h4></div>
                                    <Spinner animation="border" role="status"></Spinner></div>}
                               </div>
                               </div>
                        </section>
                       
            </main>
        </>
    )
}

export default Home;
