const { AuthenticationClient, ManagementClient } = require("auth0");
const dotenv = require("dotenv");

dotenv.config();

const auth0 = new AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
});

const management = new ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET
});

const getToken = async (username, password) => {
    try {
        const response = await auth0.oauth.passwordGrant({
            username,
            password,
            scope: "openid profile email",
            realm: "Username-Password-Authentication",
            audience: process.env.AUTH0_AUDIENCE
        });

        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getUser = async (userId) => {
    try {
        const user = await management.getUser({ id: userId });
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const getUserId = async (token) => {
    try {
        const user = await auth0.getProfile(token);
        return user.sub;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    getToken,
    getUser,
    getUserId
};