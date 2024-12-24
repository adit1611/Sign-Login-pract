const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
    origin: 'https://sign-login-pract-vt.vercel.app', // Remove the trailing slash
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS options globally
app.use(cors(corsOptions));

// Body Parser Middleware
app.use(bodyParser.json());

// Ping route for testing
app.get('/ping', (req, res) => {
    res.send('👋💞💞💓');
});

// Routes
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
