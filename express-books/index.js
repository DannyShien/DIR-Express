const express = require('express');
const PORT = 3000; 

const bookRouter = require('./routes/books');

const app = express();

app.use('/books', bookRouter);

app.listen(3000, () => {
    console.log(`YOU ARE NOW LIVE ON ${PORT}!`);
})