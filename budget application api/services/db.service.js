const mongo = require("mongoose");
const indexSchema = require("../model/index.model");
mongo.connect("mongodb://127.0.0.1:27017/budgetapp");

const getAllData = async() =>{
    const dataRes = await indexSchema.find();
    console.log(dataRes);
    return dataRes
}

const findById = async(query) =>{
    const dataRes = await indexSchema.find(query);
    return dataRes
}
const createData = async(data) =>{
    const dataRes = await new indexSchema(data).save();
    return dataRes
}
const deleteRecord = async(query) =>{
    const dataRes = await indexSchema.deleteOne(query);
    return dataRes
}
const updateRecord = async(query,data) =>{
    const dataRes = await indexSchema.updateOne(query,data);
    return dataRes
}

module.exports = {
    getAllData,
    findById,
    createData,
    deleteRecord,
    updateRecord
}
