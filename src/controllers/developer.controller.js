const { handleAsync } = require("../services/error.service");
const { getToken } = require("../services/auth0.service");

const health = async (req, res) => {
    try {
        res.status(200).send("OK");
    } catch (error) {
        console.log(error);
        res.status(500).send("System is not healthy");
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await getToken(username, password);
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).send("Login failed");
    }
};

module.exports = {
    health: handleAsync(health),
    login: handleAsync(login),
};
