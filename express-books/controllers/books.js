function create(req, res) {
    res.json({message: 'CREATED..'});
}

function retrieveAll(req, res) {
    res.json({message: 'GOT IT..'});
}

function update(req, res) {
    res.json({message: 'CHANGED..'});
}

function del(req, res) {
    res.json({message: 'GONE..'});
}

module.exports = {
    create, 
    retrieveAll, 
    update, 
    del
}

