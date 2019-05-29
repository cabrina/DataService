const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const myRoutes = express.Router();
const PORT = 4020;

let Product = require('./models/Products');

app.use(cors());
app.use(bodyParser.json());
app.use('/products', myRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

mongoose.connect('mongodb://127.0.0.1:27017/products', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

myRoutes.route('/').get(function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            console.log(err);
        } else {
            res.json(products);
        }
    });
})

myRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
})

myRoutes.route('/add').post(function(req, res) {


    console.log(req.body)
    let product = new Product(req.body);
    product.save()
        .then(product => {
            res.status(200).json({'product': 'product added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new product failed');
        });
})

myRoutes.route('/update/:id').post(function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (!product)
            res.status(404).send('data is not found');
        else
            product.product_name = req.body.product_name;
            product.product_info = req.body.product_info;
            product.product_price = req.body.product_price;
            product.product_photo = req.body.product_photo;

            product.save().then(product => {
                res.json('Product updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
})

myRoutes.delete("/delete/:id", function (req, res){
    console.log("Her er delete")
    Product.deleteOne({ _id: req.params.id }, function (err, result) {
        if (err) {
            console.log("fejl!");
        } else {
            var svarretur = "Antal slettede produkter:" + result.deletedCount 
            res.json(svarretur);
            console.log("Antal slettede: ", result.deletedCount);
        }
    }).catch(function(){
        console.log("Noget gik helt galt!");
    });
});

