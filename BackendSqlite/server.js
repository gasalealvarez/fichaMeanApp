const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const multer = require('multer');

//app.use(express.json());
app.use(express.json({ limit: '2000kb' }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.json());



app.use('/api', require('./Rutas/rutas'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Cerrar la base de datos cuando el proceso termine
/* process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database', err.message);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
}); */