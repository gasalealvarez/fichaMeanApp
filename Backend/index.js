const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();

conectarDB();
app.use(cors());

app.use(express.json());

app.use('/api/fichaapp', require('./routes/ficha'));

// app.get('/', (req, resp)=> {
//     resp.send('Hola Mundo')
// })

app.listen(4000, () => {
    console.log('El servidor esta corriendo en Port 4000 ')
})