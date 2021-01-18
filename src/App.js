
import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      isDeleteProduct: false,
      error: null,
      response: {},
      product: {},
      isEditProduct: false
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  onFormSubmit(data) {
    let apiUrl;
    
    
    
    if(this.state.isEditProduct){
      apiUrl = 'http://localhost:5000/editProduct';
    } else {
      apiUrl = 'http://localhost:5000/createProduct';
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddProduct: false,
          isEditProduct: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
    
  }

  deleteProduct = productId => {

    const apiUrl = 'http://localhost:5000/deleteProduct';
    const formData = new FormData();
    var data = {"id":productId}
   // formData.append('productId', productId);
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const options = {
     method: 'POST',
     body: JSON.stringify(data),
     headers
   };
    
    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isDeleteProduct: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }
  editProduct = productId => {

    const apiUrl = 'http://localhost:5000/getProduct';
    const formData = new FormData();
    var data = {"id":productId}
   // formData.append('productId', productId);
   const headers = new Headers();
   headers.append('Content-Type', 'application/json');

   const options = {
     method: 'POST',
     body: JSON.stringify(data),
     headers
   };
    
    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result[0],
            isEditProduct: true,
            isAddProduct: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let productForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
    }

    return (
      <div className="App">
        <Container>
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {(this.state.isDeleteProduct || !this.state.isAddProduct ) && <ProductList deleteProduct={this.deleteProduct} editProduct={this.editProduct}/>}
          { productForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}
          {!this.state.isAddProduct && <Button variant="primary" onClick={() => this.onCreate()}>Add Product</Button>}
        </Container>
      </div>
    );
  }
}

export default App;

