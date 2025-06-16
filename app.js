const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/authRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', userRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});