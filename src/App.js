import React, {useEffect, useState} from 'react';
import { HashRouter, Route, Switch, useHistory} from 'react-router-dom';
import axios from 'axios';

// JS IMPORTS - Pages
import Home from './components/pages/Home/Home';
import Products from './components/pages/Products/Products';
import ProductDetail from './components/pages/ProductDetail/Product';
import Contact from './components/pages/Contact/Contact';
import Login from './components/pages/Login/Login';
import User from './components/editor/pages/User';
import Admin from './components/editor/pages/Admin';
import AddNews from './components/editor/pages/AddNews';
import EditNews from './components/editor/pages/EditNews';
import EditComment from './components/editor/pages/EditComment';
import SearchResult from './components/pages/SearchResult/SearchResult';

// JS IMPORTS - Layout
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Error from './components/layout/ErrorLayout/Error';

// Context
import DbProvider from './components/context/DbProvider';

// Fanger alle fejl fra backend (4xx-5xx eller ikke 2xx) og viser en alert.
axios.interceptors.response.use(response => {
  return response; //Hvis der ikke er fejl, returner vi bare det normale response
}, error => {
  alert(error.response.data.message);
  return Promise.reject(error);
});


 const App = () => {
   
  return (
    <DbProvider>
    <HashRouter>
    <div className="App">
    
      <Header />
   
      <Switch>
        <Route path="/produkter/soeg/:text" component={SearchResult} />
        <Route exact path="/" component={Home} />
        <Route path="/produkter" component={Products} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login}/>
        <Route path="/product/:product_id" component={ProductDetail}/>
      
        <LoggedinCheck>
        <Route path="/user/" component={User} />
        <Route path="/admin/" component={Admin} />
        <Route path="/addnews/" component={AddNews} />
        <Route path="/editnews/:id" component={EditNews} />
        <Route path="/editcomment/:id" component={EditComment} />
        </LoggedinCheck>
      
      </Switch>
    <Footer />
   
    </div>
    </HashRouter>
    </DbProvider>
  )
}

// /Children er components der er wrapped rundt om LogginCheck, altså i mellem <LoggedinCheck>...</LoggedinCheck>
const LoggedinCheck = ({children}) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
      axios.get("http://localhost:5033/login/loggedin", {withCredentials: true})
      .then(response => {
        if(!response.data.message){
          setTimeout(() => {
            history.push('/'); // Redirect
            setLoading(false);
          }, 5000);
        } else {
          setLoading(false);
        
        }        
      });
  });
  return (
    <div>
      {loading ? <Error /> : children} 
    </div>
  )
}

export default App;
