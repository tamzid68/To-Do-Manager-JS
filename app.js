const express = require('express');
const app = express();
require('dotenv').config();
//const bodyParser = require('body-parser');

const rateLimitMiddleware = require('./middleware/rateLimitMiddleware');
const checkClient = require('./middleware/clientCheckMIddleware');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

//app.use(bodyParser.json());
app.use(express.json()); // Use express's built-in JSON parser
app.use(express.urlencoded({ extended: true }));
app.use(rateLimitMiddleware); // Apply rate limiting middleware
app.use(checkClient); // Apply client check middleware


app.get('/', (req, res) => {
   res.send("TO_DO Manager API is running..."); 
});

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});