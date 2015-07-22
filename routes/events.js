var express = require('express');
var markdown = require('markdown-js');
var mongoose = require('./mongo.js');
var router = express.Router();

var activitySchema=new mongoose.Schema({
	user_id:String,
	activity_title:String,
	activity_start:String,
	activity_end:String,
	activity_distance:String,
	activity_time:String,
	activity_publish_tel:String,
	activity_tips:String,
	ctime:String,
	mtime:String
});
var Activitys=mongoose.model('activity',activitySchema);

/* GET events listing. */
router.get('/', function(req, res) {
  Activitys.find({},function(error,activitys){
    console.log(activitys);
	res.render('event',{title:'活动集锦',results:activitys});
  });  
});


router.get('/createActivity',function(req,res,next){
		res.render('createActivity',{title:'创建活动'});
});

router.post('/createActivity',function(req,res,next){
  var userId="10001";
  var activityTitle=req.body.activityTitle;
  var activityStart=req.body.activityStart;
  var activityEnd=req.body.activityEnd;
  var activityDistance=req.body.activityDistance;
  var activityTime=req.body.activityTime;
  var activityPublisherTel=req.body.activityPublisherTel;
  var activityKindlyReminder=req.body.activityKindlyReminder;
  var createActivity=new Activitys({
		user_id:userId,
		activity_title:activityTitle,
		activity_start:activityStart,
		activity_end:activityEnd,
		activity_distance:activityDistance,
		activity_time:activityTime,
		activity_publish_tel:activityPublisherTel,
		activity_tips:activityKindlyReminder
	}).save(function(err,newActivity){
		if(err) throw err;
		console.log("创建活动成功:" + newActivity.activity_title);		
	});
});

router.get('/2014/:title.html',function(req,res){
	var path=['2014/',req.params.title,'.md'].join('');
	res.render(path,{layout:false,title:'楚汉单车俱乐部'});
});

module.exports = router;
