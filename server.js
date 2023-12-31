const express = require('express'); // import express
const cors = require('cors');
const bodyParser = require('body-parser'); // import bodyParser
const app = express();
const path = require('path');
app.use(cors());
const connectToDatabase = require('./db');

const product = require('./routes/products');
const authModel = require('./models/userModel'); // import authModel
const productModel = require('./models/productModel');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT || 5000; // hosting port or local port

app.get('/', async (req, res) => {
    var pipeline = [
        { $lookup: { from: "items", localField: "product_id", foreignField: "product_id", as: "productbyItem" } },    ]
    productModel.aggregate(pipeline)
        .then((result) => {
            res.status(200).json({ state: true, msg: "new product saved successfully!", data: result })
        })
        .catch((error) => {
            console.log(error);
        });
  });


  app.use('/upload', express.static('upload')); // get images in the server

app.use(express.static(path.join(__dirname, 'public')));


app.use('/product', product);
connectToDatabase(); // connect to database

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
