const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Amriti$best';

//middleware function
const fetchUser = (req, res, next) => {
    //token extracted from the header of the get user request; auth-token was received from login request
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({ error: "Please authenticate using a valid token."})
    }
    try {
        //checks for user and next function is called
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token."})       
    }
}

module.exports = fetchUser;