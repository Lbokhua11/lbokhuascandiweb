import React from "react"
import './App.css';
import Header from './Header';

import ProductListPrototype from "./ProductListPrototype";
import Footer from "./Footer";

function App() {
  return (
    <div className="app">
      
      <Header />
      <ProductListPrototype />
      {/*<ProductList />*/}
          {/*Product*/}
      <Footer />
    </div>
  );
}

export default App;
