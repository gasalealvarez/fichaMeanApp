const express = require('express');
const bodyParser = require('body-parser');
// const cors =require('cors');


const app = express();


// midlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Database sync


// routes
app.use(require('./routes/index'));

// require('./routes/index')(app)
app.listen(3000);
console.log("Server on port 3000");

// module.exports = app;