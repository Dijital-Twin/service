const { handleAsync } = require("../services/error.service");
const aiService = require("../services/ai.service");

const baseModel = async (req, res) => {
  try {
    const text = await aiService.baseModel(req.body);
    res.json({ data: text, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  baseModel: handleAsync(baseModel),
};
