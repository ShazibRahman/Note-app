const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "WaaduHekIsThis$me@qqw"


const fetchUsers = (req, res, next) => {
    //get the user from the jwt token append id to the req body
    const token = req.header('authorization')?.replace("Bearer ", "") //replacing bearer  with empty string 
    if (!token) return res.status(401).send({ error: "please authenticate using a valid token" })
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(401).send({ error: "please authenticate using a valid token" })
    }

}

module.exports = fetchUsers