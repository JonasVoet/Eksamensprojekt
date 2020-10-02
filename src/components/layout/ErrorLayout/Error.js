import React from 'react';
import {Link} from 'react-router-dom';

import './Error.scss';

 const Error = () => {
    return (
        <>
            <main className="main">
                        <section className="error-site">
                            <div className="container">
                                <h2>OOPS!</h2>
                                <p className="info">Du har ikke adgang til denne side, hvis du ikke er logget ind!</p>
                               </div>
                               <div className="bounce">
                               <Link to="/" className="button">Klik her for at gå tilbage!</Link>
                               </div>
                        </section>
            </main>
        </>
    )
}

export default Error;
