import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import {Helmet} from "react-helmet";
import Comments from '../../layout/Pagination/Comments';
import Pagination from '../../layout/Pagination/Pagination';

// SCSS
import './Product.scss';

//Icon
import {FaRegHeart, FaComments, FaPen} from 'react-icons/fa';



 const Product = () => {
    const [products, setProducts] = useState();
    const [recipes, setRecipes] = useState({});
    const [commentCounter, setCommentCounter] = useState();
    const [comments, setComments] = useState([]);
    const {product_id} = useParams();
    
    // Comment
     const [kommentaren, setKommentaren] = useState('');
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(3);
    
   
     // Get current comments
     const indexOfLastComment = currentPage * commentsPerPage;
     const indesOfFirstComment = indexOfLastComment - commentsPerPage;
     const currentComment = comments.slice(indesOfFirstComment, indexOfLastComment);
 
     // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);
     
    useEffect(() => {
        Axios.get('http://localhost:5033/produkter/' + product_id)
            .then(res => {
                setProducts(res.data);
                setRecipes(res.data.ingredienser);
                setCommentCounter(res.data.kommentar);
                setComments(res.data.kommentar);
            });
        
    }, [product_id]);

   
    const handleSubmit = (e, error) => {
        e.preventDefault();

        Axios.post('http://localhost:5033/kommentar/admin',  {titel:'test', kommentaren, bruger:localStorage.getItem('userid'), produkt:product_id}, {withCredentials:true})
       .then(res => {
           console.log(res.data);

           alert('Nu har du indsendt en kommentar');
           window.location.reload();

           if (error === 401) {
               alert('Du skal logge ind for at kommentere!')
           }
       }) 

       
       .catch((error) => console.log( error.response ) );

    }

    const handleLike = (e) => {
        e.preventDefault();
        Axios.patch('http://localhost:5033/produkter/likes/' + product_id);
        window.location.reload();
    }

    
    // Recipes
    const recipeList = recipes.length ? (
        recipes.map(recipe => {
            return (
            <p key={recipe._id} className="recipe-box">{recipe.maengde}{recipe.enhed_forkortet} {recipe.ingrediens_titel}</p>
            )
        })
    ) : (
        <div>Loading</div>
    )


    return (
        <>
        <Helmet>
                <title>Bageriet - Produkt</title>
                <meta name="description" content="Her kan du se information omkring produktet. Du kan læse opskriften og se kommentare" />
            </Helmet>

            <main className="main">
                <div className="container">
                    
               <div className="product-shower">
               {products !== undefined ?
                    <p><span>Produkter &gt;</span> {products.titel}</p>
                    : "loading..."}
               </div> 

               <section className="detail">
               
                   <article className="boxex">
                 
                   {products !== undefined ?
                       
                    <>
                    <h1>{products.titel}</h1>
                   <h2>{products.kategori.titel}</h2>
                    <div className="img-text-container">
                    <div className="img-box">
                    <img src={`http://localhost:5033/images/${products.image}`} alt="Håndværker"/>
                    </div>
                    <div className="text-box">
                    <p dangerouslySetInnerHTML={{__html: products.beskrivelse}}></p>
                 
                    </div>
                    
                    </div>
                    </>
                  
                  
                  : "loading..."}
                   </article>
                   
                   {products !== undefined ?
                   <aside className="box2">  
                    <button onClick={handleLike} className="like">LIKE! <FaRegHeart className="icon"/><span>{products.likes}</span></button>
                    <h3>Ingredienser</h3>
                    <div className="recipe">
                      {recipeList}
                    </div>
                    
                   </aside>
                   : "loading..."}
                
               </section>

               {commentCounter !== undefined ? 
             
                <section className="comments">
                    
                    <div className="comment-title">
                   
                        <h4>kommentar</h4>
                        <p> {commentCounter.length} <FaComments className="icon"/></p> 
                        
                    </div>
                    
                    <form onSubmit={handleSubmit} className="form">
                    <FaPen className="icon"/>
                    
                    <input type="text"  required placeholder="fortæl os hvad du synes....." onChange={(e) => setKommentaren(e.target.value)} />
                    
                    <button type="submit" className="button">Indsæt</button>
                    </form>
                    <div className="comment-boxes">
                    <Comments comments={currentComment}/>
                    <Pagination
                    commentsPerPage={commentsPerPage}
                    totalComments={comments.length}
                    paginate={paginate}
                    />
                    </div>
                    
                </section>
           
              : "loading..."}
               </div>
            </main>
        </>
    )
}

export default Product
