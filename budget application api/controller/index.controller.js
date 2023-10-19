const dbService = require("../services/db.service");
const getData = async (req, res) =>{
    const dataRes = await dbService.getAllData();
    res.status(200);
    res.json(dataRes)
}
const getById = async (req, res) =>{
    const id = req.params.id;
    const query = {
        _id : id
    }
    const dataRes = await dbService.findById(query);
    res.status(200);
    res.json(dataRes)
}
const insertData = async (req, res) =>{
    const data = req.body;
    const dataRes = await dbService.createData(data);
    console.log(data);
    res.status(200);
    res.json({
        message : "Data Inserted",
        data : dataRes
    })
}
const deleteData = async (req, res) =>{
    const id = req.params.id;
    const query = {
        _id : id
    }
    const dataRes = await dbService.deleteRecord(query);
    res.status(200);
    res.json({
        message : "Data deleted",
        data : dataRes
    })
}
const updateData = async (req, res) =>{
    
    const id = req.params.id;
    const query = {
        _id : id
    }
    const data = req.body;
    const dataRes = await dbService.updateRecord(query,data);
    res.status(200);
    res.json({
        message : "Data updated",
        data : dataRes
    })
}
module.exports = {
    getData,
    getById,
    insertData,
    deleteData,
    updateData
}