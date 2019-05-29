import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddProduct from "./components/AddProduct";
import ProductList from './components/AllProducts';
import EditProduct from './components/EditProduct';
import DeleteProduct from './components/DeleteProduct'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">      
            <div className="collpase nav-collapse scubanav">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/Products" className="nav-link">PRODUKTER</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/Add" className="nav-link">TILFØJ PRODUKT</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/Products" exact component={ProductList} />
          <Route path="/Add" exact component={AddProduct} />
          <Route path="/Edit/:id" component={EditProduct} />
          <Route path="/delete/:id" component={DeleteProduct} />
          
        </div>
      </Router>
    );
  }
}

export default App;
