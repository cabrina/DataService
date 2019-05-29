import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
    <tr>
        <td>{props.product.product_name}</td>
        <td>{props.product.product_info}</td>
        <td>{props.product.product_price}</td>
        <td>{props.product.product_photo}</td>
        <td>
            <Link to={"/edit/"+props.product._id}>Edit</Link> | <Link to={"/delete/" + props.product._id}>Slet</Link>
        </td>
    </tr>
)

export default class ProductList extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {products: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4020/products/')
            .then(response => {
                this.setState({products: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4020/products/')
        .then(response => {
            this.setState({products: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    productList() {
        return this.state.products.map(function(currentProduct, i) {
            return <Product product={currentProduct} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>PRODUKTER</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Beskrivelse</th>
                            <th>Pris</th>
                            <th>Billede</th>
                            <th>ret/slet</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.productList() }
                    </tbody>
                </table>
            </div>
        )
    }
}