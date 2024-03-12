const { handleAsync } = require("../services/error.service");
const aiService = require("../services/ai.service");
const hayStackService = require("../services/haystack.service");

const baseModel = async (req, res) => {
  try {
    const text = await aiService.baseModel(req.body);
    res.json({ data: text, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const haystackModel = async (req, res) => {
  try {
    const answer = await hayStackService.haystackModel(req.body);
    res.json({ data: answer, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  baseModel: handleAsync(baseModel),
  haystackModel: handleAsync(haystackModel),
};
