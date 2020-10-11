var express = require('express');
var router = express.Router();
const {getStationData} = require('../controllers/calculate')
const {cache} = require('../middleware/cache');


router.get('/ping', function(req, res, next) {
  res.json({data:'pong'});
});


router.get('/info', cache, getStationData);

module.exports = router;
