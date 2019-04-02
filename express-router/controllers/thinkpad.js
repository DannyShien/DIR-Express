// CREATE
function create(req, res) {
    res.json({message: 'YOU CREATED SOMETHING!'});
}

// RETRIEVE
function retrieve(req, res) {
    res.json({message: 'ITEM RETRIEVED!'});
}

// UPDATE
function update(req, res) {
    res.json({message: 'UPDATE HAS BEEN MADE!'});
}

// DELETE
function del (req, res) {
    res.json({message: 'SUCKA IS GONE!'});
}

module.exports = {
    create, 
    retrieve, 
    update, 
    del
}