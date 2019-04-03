const express = require('express'); // Brings in the express library
const app = express();              // Creates a new express app
const es6Renderer = require('express-es6-template-engine');
const http = require('http');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const PORT = 3000;

// Import my model class
const Restaurant = require('./models/restaurants');
const User = require('./models/user');
const Review = require('./models/reviews');


app.engine('html', es6Renderer); // Introduce them: 
// "Hey app, meet es6Renderer. They speak html"
app.set('view engine', 'html'); //tells express to use as its view engine the thing that speaks html

app.set('views', 'views'); //tell express where to find the view files (The second argument is the name of the directory where my template files will live.)

// When they ask for the login page, send the login form
app.get('/login', (req, res) => {
    // send them the form!!
    // res.send('LOGIN FORM, DUHH');
    res.render('login-form');
});

app.get('/restaurant', async (req, res) => {
    const allRestaurants = await Restaurant.getAll();
    // const restaurantJSON = JSON.stringify(allRestaurants);    
    // RES.JSON WILL DO 2 THINGS: 
    // 1. It converts your JS Object or Array to a JSON string
    // 2. It puts the correct Content-Type header on the response
    res.json(allRestaurants);
});

app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    res.json(allUsers);
});

app.get('/users/:id', async (req, res) => {
    // How to grab a piece of req.params (or any object):
    // const id = req.params.id;
    // This is known as "deconstructuring"
    const {id} = req.params;
    const theUser = await User.getById(id);
    res.json(theUser);
});

app.get('/reviews', async (req, res) => {
    console.log(Review);
    const allReviews = await Review.getAll();
    res.json(allReviews);
}); 

app.get('/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const theReview = await Review.getById(id);
    res.json(theReview);
});

// app.post('/', (req, res) => {
//     const parsedBody = querystring.parse(body);
//     const newUserId = await User.add(parsedBody);
//     res.send(`{ "id": ${newUserId}}`);
// });

app.listen(PORT, () => {
    console.log(`SERVING ON: ${PORT}`);
});