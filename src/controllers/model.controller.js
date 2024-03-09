const { handleAsync } = require("../services/error.service");
const modelService = require("../services/model.service");

const getAllModels = async (req, res) => {
    try {
        const models = await modelService.getAllModels();
        res.json({ data: models, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createModel = async (req, res) => {
    try {
        const model = await modelService.createModel(req.body);
        res.json({ data: model, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getModelById = async (req, res) => {
    try {
        const model = await modelService.getModelById(req.params.id);
        res.json({ data: model, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateModel = async (req, res) => {
    try {
        const model = await modelService.updateModel(req.params.id, req.body);
        res.json({ data: model, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteModel = async (req, res) => {
    try {
        const model = await modelService.deleteModel(req.params.id);
        res.json({ data: model, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllModels: handleAsync(getAllModels),
    createModel: handleAsync(createModel),
    getModelById: handleAsync(getModelById),
    updateModel: handleAsync(updateModel),
    deleteModel: handleAsync(deleteModel),
};
