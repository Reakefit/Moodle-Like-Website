import jwt from 'jsonwebtoken';
import { UserSession } from '../models/UserSession.js';

module.exports = (req, res, next) => {
    try {
        const token = req.cookies['token'] || req.query.token;
        const userIdCookie = req.cookies['userId'] || req.query.userId;

        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        if (userIdCookie !== userId) {
            throw 'Invalid user ID';
        } else {

            UserSession.findOne({ userId: userId })
                .then((session) => {

                    if(session && session.token === token)
                        next();
                    else
                        res.status(401).json({
                            error: new Error('Invalid token or not stored!')
                        });
                })
                .catch((err) => {
                    throw 'Error: ' + err;
                });

        }
    }
    
    catch (e) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}