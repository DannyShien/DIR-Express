const express = require('express'); // Brings in the express library
const app = express();              // Creates a new express app
const es6Renderer = require('express-es6-template-engine');
const http = require('http');
const querystring = require('querystring');

// Require my session and sessions storage modules
// This modele lets express track users as they go from page to page. 
const session = require('express-session');

// Import the session stroage module and wire it up to the session module. 
const FileStore = require('session-file-store')(session);

// Tell express to use the session modules
app.use(session({
    store: new FileStore(), 
    secret: 'yahayahayha'
}))

// const hostname = '127.0.0.1';
const PORT = 3000;

// Import my model class
const Restaurant = require('./models/restaurants');
const User = require('./models/user');
const Review = require('./models/reviews');


app.engine('html', es6Renderer); // Introduce them: 
// "Hey app, meet es6Renderer. They speak html"
app.set('view engine', 'html'); //tells express to use as its view engine the thing that speaks html

app.set('views', 'views'); //tell express where to find the view files (The second argument is the name of the directory where my template files will live.)

// configure express to use the built in middleware that can deal with form data.
app.use(express.urlencoded({ extended: true }));

// When they ask for the login page, send the login form
app.get('/login', (req, res) => {
    // send them the form!!
    // res.send('LOGIN FORM, DUHH');
    res.render('login-form', {
        locals: {
            email: '',
            message: ''
        }
    });
});
// ================================================================
// ========== USED TO FORCE THE CODE TO WORK ======================
async function demo() {
    const user = await User.getByEmail('puppypower@yahoo.com');
    user.setPassword("spots");
    const pass = await user.save();
    console.log('you did the thing')
}
demo();
// ================================================================

// When they submit the form, process the form data. 
app.post('/login', async (req, res) => {
    console.log(`EMAIL ME == ${req.body.email}`);
    console.log(`USE MY SECRET PW == ${req.body.password}`);
    // res.send('Send me something');
    // lets assume they typed in the correct password
    const theUser = await User.getByEmail(req.body.email);
    // console.log(theUser)
    const passwordIsCorrect = theUser.checkPassword(req.body.password);
    console.log(`STOLEN == ${passwordIsCorrect}`)
    if (passwordIsCorrect) {
        
        // Save the user's id to the session.
        req.session.user = theUser.id;
        // Make sure the sessions is saved before we redirect.
        req.session.save(() => {
            res.redirect('/dashboard');
        });
    } else {
        console.log('NOT WORKING')
        // send the form back, but with the email already filled out. 
        res.render('login-form', {
            locals: {
                email: req.body.email,
                message: 'Password incorrect. Please ty again.'
            }
        });
    }
    
});


app.get('/dashboard', (req, res) => {
    console.log(`YOU ARE == ${req.session.user}`);
    res.send('YASSSS, YOU ARE NOW A MEMBER OF SECRET SOCIETY!!')
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