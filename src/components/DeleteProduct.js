import React, { Component } from 'react';
import axios from 'axios';

class DeleteProduct extends Component {

    //tom state "skabelon"
    state = {
        product_name: '',
        product_info: '',
        product_price: '',
        product_photo: ''
    }

    componentDidMount(){

        console.log("props her: ", this.props)

        // kald webAPI/backend og hent todo ud fra dens id
        axios.get('http://localhost:4020/products/' + this.props.match.params.id)
        .then(response => {

            //udfyld state med den todo der blev fundet ud fra ID,som lev sendt med hertil
            this.setState({
                product_name: response.data.product_name,
                product_info: response.data.product_info,
                product_price: response.data.product_price,
                product_photo: response.data.product_photo
            });
        })
        .catch(function(error) {
            console.log(error)
        });
    };

    onClickDelete = (e) => {

        axios.delete('http://localhost:4020/products/delete/' + this.props.match.params.id)
        .then(res => {
            console.log("mon noget er slettet?", res.data);
            this.props.history.push('/');
        });
    }

    render(){
        return(
            <div className="card mt-5">
                <div className="card-body">
                    <h3 className="card-title"> Er du sikker på at du vil slette denne? </h3>
                    <h4>{this.state.product_name}</h4>

                    <button className="btn btn-danger mr-3" onClick={this.onClickDelete}>SLET</button>
                    <button className="btn btn-medium">Fortryd</button>
                </div>
            </div>
        )
    }
}

export default DeleteProduct