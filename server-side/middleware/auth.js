import jwt from "jsonwebtoken";
import ENV from "../config.js"

/** auth middleware */
export default async function Auth(req, res, next){
    try {
        // bearer token
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

        req.user = decodedToken;

        next();
    } catch(error) {
        res.status(401).json({
            error: 'Unauthorized'
        })
    }
}

export function localVariable(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next();
}