var nodemailer=require('nodemailer');
var transporter=nodemailer.createTransport({
  service:'QQ',
  auth:{
       user:'820061435@qq.com',
	   pass:'xxxxxxxxxxxxxx'
  }
});

var mailOptions={
  from:'820061435@qq.com',
  to:'820061435@qq.com',
  subject:'nodemail 测试',
  text:'欢迎使用nodemailer',
  html:'欢迎使用nodemailer'
};

transporter.sendMail(mailOptions,function(error,info){
	if(error){
		console.log(error);
	}else{
		console.log('Message send'+info.response);
	}
});
