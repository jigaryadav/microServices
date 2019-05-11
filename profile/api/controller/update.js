const User = require('../models/user');

const update = async (req, res) => {
    let userData  = req.validUserData;
    
}

const notFound = (res)=>{
    res.status(404).json({
        status: 404,
        message: 'No data found'
    })
}

module.exports = update;