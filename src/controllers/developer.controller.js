const { handleAsync } = require("../services/error.service");
const modelService = require("../services/model.service");

const health = async (req, res) => {
    try {
        res.status(200).send("OK");
    } catch (error) {
        console.log(error);
        res.status(500).send("System is not healthy");
    }
};

module.exports = {
    health: handleAsync(health),
};
