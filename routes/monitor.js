var schedule = require('node-schedule');
var superagent = require('superagent');
var nodemailer=require('nodemailer');


var transporter=nodemailer.createTransport({
  service:'163',
  auth:{
       user:'monitorproject@163.com',
	     pass:'bullshit123456'
  }
});

var mailOptions={
  from:'monitorproject@163.com',
  to:'18511695865@163.com,jingpinhui_baojing@foxmail.com',
  subject:'',
  text:'',
  html:''
};


/* every minute */
var job = schedule.scheduleJob('*/1 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
  requestTuan();
});

function requestTuan(){  
    var url='http://tuan.jd.com/beijing-index.html';
	superagent.get(url).end(function(err,res){
		if (err) {
			mailOptions.subject="首页访问异常";
			mailOptions.text="首页访问异常";
			mailOptions.html="首页访问异常";
  			sendMail(mailOptions);
		}else{
			var status =res.status;
			if(status!=200){
				mailOptions.subject="首页访问异常";
				mailOptions.text="首页访问异常,status："+status;
				mailOptions.html="首页访问异常,status："+status;
				sendMail(mailOptions);
			}else{
				mailOptions.to="18511695865@163.com";
				mailOptions.subject="首页访问正常";
				mailOptions.text="首页访问正常,status："+status;
				mailOptions.html="首页访问正常,status："+status;
				sendMail(mailOptions);
			}
		}
	}); 
}


function sendMail(options){
	transporter.sendMail(options,function(error,info){
		if(error){
			console.log(error);
		}else{
			console.log('Message send'+info.response);
		}
	});	
}