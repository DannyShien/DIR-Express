const express = require('express');
const Router = express.Router;

// const controller = require('../controllers/thinkpad');
// You don't want the box, just the stuff inside.

const {
    create, 
    retrieveAll, 
    update, 
    del
} = require('..contorllers/thinkpad');

const thinkpadRoutes = Router();

// Add handlers for the routes

// GET
thinkpadRoutes.get('/', retriveAll);

// POST 
thinkpadRoutes.post('/', create);

// UPDATE 
thinkpadRoutes.put('/', update);

// DELETE
thinkpadRoutes.delete('/', del);

// Export the router
module.exports = thinkpadRoutes;