const { auth } = require('express-oauth2-jwt-bearer');
const dotenv = require("dotenv");

dotenv.config();

const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
});

const checkScopes = (scopes) => {
    return (req, res, next) => {
        const tokenPermissions = req.auth.payload.permissions;
        const hasRequiredScopes = scopes.every((scope) => tokenPermissions.includes(scope));
        if (!hasRequiredScopes) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
}

module.exports = {
    checkJwt,
    checkScopes,
};