var express = require('express');
var router = express.Router();
const indexControler = require("../controller/index.controller")

/* GET home page. */
router.get('/', function(req, res) {
  indexControler.getData(req, res)
});

router.get('/:id', function(req, res) {
  indexControler.getById(req,res)
});
router.post('/', function(req, res) {
  indexControler.insertData(req,res)
});
router.delete('/:id', function(req, res) {
  indexControler.deleteData(req,res)
});
router.put('/:id', function(req, res) {
  indexControler.updateData(req,res)
});
module.exports = router;
