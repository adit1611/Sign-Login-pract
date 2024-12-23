const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./Models/db');
const bodyParser = require('body-parser');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'https://sign-login-pract-vt.vercel.app', // Specify the origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.get('/ping',(req,res) => {
    res.send('👋💞💞💓');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT, ()=> {
    console.log(`Server is listening on ${PORT}`)
})