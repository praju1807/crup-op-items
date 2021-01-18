
import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      product_name: '',
      price: '',
      sku: '',
      error:''
    }

    if(props.product){
      this.state = props.product
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
    id: ''
    })
    if(this.state.product_name == '' || this.state.price == '' ||this.state.sku == ''  )
    {
      alert("Please fill details");
      return;
    }
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {

    let pageTitle;
    if(this.state.id) {
      pageTitle = <h2>Edit Product</h2>
    } else {
      pageTitle = <h2>Add Product</h2>
    }

    return(
      <div>
        {pageTitle}
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="product_name
              ">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="product_name"
                  value={this.state.product_name}
                  onChange={this.handleChange}
                  placeholder="Product Name"/>
              </Form.Group>
              <Form.Group controlId="sku">
                <Form.Label>Sub Item</Form.Label>
                <Form.Control
                  type="text"
                  name="sku"
                  value={this.state.sku}
                  onChange={this.handleChange}
                  placeholder="SKU" />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                  placeholder="Price" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="hidden" name="id" value={this.state.id} />
                <Button variant="success" type="submit">Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddProduct;
