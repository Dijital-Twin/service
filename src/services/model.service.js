const modelModel = require("../models/model.schema");

getAllModels = async () => {
    return await modelModel.find();
};

createModel = async (model) => {
    return await modelModel.create(model);
};

getModelById = async (id) => {
    return await modelModel.findById(id);
};

updateModel = async (id, model) => {
    return await modelModel.findByIdAndUpdate(id, model);
};

deleteModel = async (id) => {
    return await modelModel.findByIdAndDelete(id);
};

module.exports = {
    getAllModels,
    createModel,
    getModelById,
    updateModel,
    deleteModel,
};