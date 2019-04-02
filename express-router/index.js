// I need EXPRESS
const express = require('express');

// EXPRESS NEEDS IT'S OWN PORT
const PORT = 3000; 

// Require router 
const thinkpadRouter = ('./routes/thinkpack');

// Create an app with EXPRESS
const app = express();

// Need to connect the router
app.use('/thinkpads', thinkpadRouter);

// Express needs to listen to a PORT 
app.listen(PORT, () => {
    console.log(`Running on ${PORT}!`)
})


