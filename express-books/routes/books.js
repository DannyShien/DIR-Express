const express = require('express');
const Router = express.Router;

const {
    create, 
    retrieveAll, 
    update, 
    def
} = require('../controllers/books');

const booksRoutes = Router(); 

booksRoutes.get('/', retrieveAll);

booksRoutes.post('/', create);

booksRoutes.put('/', update);

booksRoutes.delete('del');

modules.exports = booksRoutes;
 