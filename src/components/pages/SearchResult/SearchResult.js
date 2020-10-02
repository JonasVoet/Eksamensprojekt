import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';

import './SearchResult.scss';



 const SearchResult = () => {
    const [searchResults, setSearchResults] = useState({});
    const {text} = useParams();

    useEffect(() => {
        Axios.get('http://localhost:5033/produkter/soeg/' + text)
            .then(res => {
                setSearchResults(res.data);
            });
    }, [text]);

     const searchList = searchResults.length ? (
        searchResults.map(search => {
            return (
                <div key={search._id} className="box">
                <img src={`http://localhost:5033/images/${search.image}`} alt={search.titel}/>
                    <h5>{search.titel}</h5>
                    <p>{search.teaser}</p>
                    <Link to={'/product/' + search._id}>
                    <button className="read-more">LÆS MERE</button>
                    </Link>
            </div>
              
            )
        })
    ) : (
        <div>Ingen søge resultater</div>
    )



    return (
        <main id="main"> 
        <Helmet>
                <title>Bageriet - Søgeresultat</title>
                <meta name="description" content="Her kan du se hvad du har søgt på, og resultaterne." />
        </Helmet>
        <section className="products">
            <div className="container">
            <h1>Du har søgt på '{text}'</h1>
            <p className="under-text">Her er dine søge resultater:</p>   
                <div className="products">
                    {searchList}
                </div>
            </div>
            </section>
        </main>
    )
}

export default SearchResult;

