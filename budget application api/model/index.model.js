const mongo = require("mongoose");
const {Schema} = mongo;

const indexSchema = new Schema({
    title : String,
    cost : Number
});

module.exports = mongo.model("data",indexSchema);