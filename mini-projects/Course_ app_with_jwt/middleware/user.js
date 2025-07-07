const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ")
    const jwtToken = words[1]
    const decodedValue = jwt.verify(jwtToken,JWT_SECRET)

    if (decodedValue){
        req.username = decodedValue.username
        next()
    }else {
        res.status(403),json({
            msg : "User does not exist"
        })
    }
}

module.exports = userMiddleware;
