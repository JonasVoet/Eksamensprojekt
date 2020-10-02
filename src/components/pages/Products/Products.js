import React, {useContext, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Spinner} from 'react-bootstrap';

// Context
import DbContext from '../../context/DbContext';

// SCSS
import './Products.scss';

// Icons
import {FaComments} from 'react-icons/fa';



 const Products = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState();
    const [currentCategory, setCurrentCategory] = useState("Morgenbrød");

    const context = useContext(DbContext);

    useEffect(() => {
        context.getCategories().then((res) => setCategories(res));
        context.getAllProducts().then((res) => setProducts(res));
      }, [context]);

    // Hvis man nu vil have at der skal være en knap til at vise alle produkter
      //   const productItemsFiltered = products.filter(item => currentCategory === "Alle" || currentCategory === item.kategori.titel);
      const productItemsFiltered = products.filter(item => currentCategory === item.kategori.titel);

      const productsItemsMapped = productItemsFiltered.map((item) => (
        <div key={item._id} className="box">
        <img src={`http://localhost:5033/images/${item.image}`} alt={item.titel}/>
            <div className="comments">
                    <p>{item.kommentar.length}</p>
                    <FaComments className="icon"/>
            </div>
                <h5>{item.titel}</h5>
                <p>{item.teaser}</p>
                <Link to={'/product/' + item._id}>
                <button className="read-more">LÆS MERE</button>
                </Link>
            </div>
        ));

    return (
        <>
        <Helmet>
                <title>Bageriet - Produkter</title>
                <meta name="description" content="Her kan du se alle produkter, og sortere efter kategori" />
            </Helmet>

            <main className="main">
            <section className="products-page">
                <div className="container">
                    <h2>Vores elskede bagværk</h2>
                    <p className="info">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus consectetur saepe repudiandae. Aliquam ab ratione aperiam accusamus? Deserunt iure, non mollitia voluptate quo facere modi odit earum nostrum nemo praesentium?</p>
                              
                    <div className="flex-container">
                    <aside className="aside">
                    {/* <button onClick={() => setCurrentCategory("Alle")} className="button"></button> */}

                    {categories != null
                    ? categories.map((category) => (
                    <div className="btns" key={category._id}>
                    <button className="button" onClick={() => setCurrentCategory(category.titel)}>{category.titel}</button>
                    </div>
                    ))
                    : <div className="container spinner"> 
                    <div><h4 id="heading-error">Kontakter databasen.. Bliv endelig hængende</h4></div>
                    <Spinner animation="border" role="status"></Spinner></div>}
                    </aside> 
                     
                    
                 
                    <div className="products-page">
                        {productsItemsMapped}
                            
                        </div>
                                
                </div>
                </div>
                        </section>
            </main>
        </>
    )
}

export default Products;
