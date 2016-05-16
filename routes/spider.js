var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var url='http://www.chuhanbike.com/';
	superagent.get(url).end(function(err,result){
	  if(err){
		next(err);
	  }
	  var $=cheerio.load(result.text);
	  var content=$('#title').html();
	  res.send(content);
	});  
});

module.exports = router;
