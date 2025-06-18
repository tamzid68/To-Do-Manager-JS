const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.send("TO_DO Manager API is running..."); 
});

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});