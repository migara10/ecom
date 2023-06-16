const express = require('express'); // import express
const cors = require('cors');
const bodyParser = require('body-parser'); // import bodyParser
const app = express();
const path = require('path');
app.use(cors());
const connectToDatabase = require('./db');
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

  app.post('/', async (req, res) => {
    try {
      const query = {userName: req.body.userName};
      const data = await authModel.find(query);
      res.send({category: data});
    } catch (error) {
      console.log(error);
    }
  });


app.use(express.static(path.join(__dirname, 'public')));


connectToDatabase(); // connect to database

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
