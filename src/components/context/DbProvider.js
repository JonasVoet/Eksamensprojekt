import React from 'react';
import DbContext from './DbContext';

import axios from "axios";

 const DbProvider = (props) => {
    const baseAPI = "http://localhost:5033/";

    return (
      <>
      <DbContext.Provider value={{
        getNews: async () => {
            let res = await axios.get(baseAPI + "nyheder/antal/3");
            return res.data;
        },
        getAllNews: async () => {
          let res = await axios.get(baseAPI + "nyheder/");
          return res.data;
      },
        getProducts: async () => {
          let res = await axios.get(baseAPI + "produkter/antal/8")
          // .catch((error) => console.log( error.response ) );
          return res.data;
        },
        getAllProducts: async () => {
          let res = await axios.get(baseAPI + "produkter");
          return res.data;
        },
        getCategories: async () => {
          let res = await axios.get(baseAPI + "kategorier")
          return res.data;
        }
             
        }}>
              {props.children}
            </DbContext.Provider>

      </>
    )
}

export default DbProvider;
