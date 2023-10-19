const express = require("express");
const router = express.Router();
const totalBudget = require("../controller/budgetController")

/* GET home page. */
router.get('/', function(req, res) {
  totalBudget.getData(req, res)
  });

router.post("/",(req,res)=>{
  totalBudget.insertOurUpdateBudget(req,res)
})

module.exports = router