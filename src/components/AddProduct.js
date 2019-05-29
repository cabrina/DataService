import React, {Component} from 'react';
import axios from 'axios';

export default class AddProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductInfo = this.onChangeProductInfo.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductPhoto = this.onChangeProductPhoto.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            product_info: '',
            product_price: '',
            product_photo: ''
        }
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductInfo(e) {
        this.setState({
            product_info: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductPhoto(e) {
        this.setState({
            product_photo: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Product Name: ${this.state.product_name}`);
        console.log(`Product Info: ${this.state.product_info}`);
        console.log(`Product Price: ${this.state.product_price}`);
        console.log(`Product Photo: ${this.state.product_photo}`);

        const newProduct = {
            product_name: this.state.product_name,
            product_info: this.state.product_info,
            product_price: parseInt(this.state.product_price),
            product_photo: this.state.product_photo
        }

        axios.post('http://localhost:4020/Products/add', newProduct)
            .then(res => console.log(res.data));

        this.setState({
            product_name: '',
            product_info: '',
            product_price: '',
            product_photo: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_name}
                                onChange={this.onChangeProductName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Info: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_info}
                                onChange={this.onChangeProductInfo}
                                />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_price}
                                onChange={this.onChangeProductPrice}
                                />
                    </div>
                    <div className="form-group">
                        <label>Photo: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.product_photo}
                                onChange={this.onChangeProductPhoto}
                                />
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}