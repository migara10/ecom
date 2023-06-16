const express = require('express'); // import express
const cors = require('cors');
const bodyParser = require('body-parser'); // import bodyParser
const app = express();
const path = require('path');
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // hosting port or local port



app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});
