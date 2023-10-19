const mongo = require("mongoose");
const {Schema} = mongo;

const totalbudgetSchema = new Schema({
    budget : Number
})
module.exports = mongo.model("totalbudget",totalbudgetSchema)