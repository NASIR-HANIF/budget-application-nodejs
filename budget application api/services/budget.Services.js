const mongo = require("mongoose");
const totalbudgetModel = require("../model/budget.model");
mongo.connect("mongodb://127.0.0.1:27017/budgetapp");

const findBudget = async ()=>{  
    const dataRes = await totalbudgetModel.find()
    return dataRes
}

const createBudget = async(data)=>{
    const dataRes = await new totalbudgetModel(data).save()
    return dataRes
}

const updataBudget = async (query , data)=>{
    const dataRes = await  totalbudgetModel.findByIdAndUpdate( query , data, {new: true})
    return dataRes
}


module.exports = {
    findBudget : findBudget,
    createBudget : createBudget,
    updataBudget : updataBudget
}