var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var hash=require('../pass').hash;

//mongoose.connect('mongodb://localhost:/myapp');
mongoose.connect('mongodb://wangshoufang:whatfangfang@ds029827.mongolab.com:29827/bike');
var userSchema=new mongoose.Schema({
	username:String,
	password:String,
	salt:String,
	hash:String
});
var User=mongoose.model('users',userSchema);

/* GET users listing. */
router.get('/', function(req, res) {
  if(req.session.user){
	  res.send('welcome ' + req.session.user.username + '<a href="/users/logout">logout</a>');
  }else{
	  res.send('<a href="/users/login">Login</a><a href="/users/signup">Sign Up</a>');
  }
});

router.get('/signup', function(req, res) {
	res.render('signup');
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/');
    });
});

router.get('/profile',requiredAuthentication, function (req, res) {
    res.send('Profile page of '+ req.session.user.username +'<br>'+' click to <a href="/users/logout">logout</a>');
});

router.post('/signup',isUserExisted,function (req, res) {
	var name=req.body.username;
	var password=req.body.password;
	console.log(req.body.username);
	console.log(req.body.password);
	hash(password,function(err,salt,hash){
		if(err) throw err;
		var user=new User({
			username:name,
			salt:salt,
			hash:hash
		}).save(function(err,newUser){
			if(err) throw err;
			authenticate(newUser.username,password,function(err,user){
				if(user){
						req.session.regenerate(function(){
								req.session.user=user;
								req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/users/logout">logout</a>.';
								res.redirect('/');
						});
				}
			});
		});
	});
});

router.post('/login',function(req,res){
	console.log(req.body.username);
	console.log(req.body.password);
	authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {
            req.session.regenerate(function () {
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.username + ' click to <a href="/users/logout">logout</a>. ';
                res.redirect('/');
            });
        } else {
            req.session.error = 'Authentication failed, please check your ' + ' username and password.';
            res.redirect('/users/login');
        }
    });
	
});


/* authenticate current user*/
function authenticate(username,password,fn){
	console.log('authenticating %s:%s',username,password);
	User.findOne({
		username:username
	},function(err,user){
		if(user){
				if(err) return fn(new Error('connot find user'));
				hash(password,user.salt,function(err,hash){
					if(err) return fn(err);
					if(hash == user.hash) return fn(null,user);		
					fn(new Error('invalid password'));
				});
		}else{
			return fn(new Error('connot find user'));
		}
	});
}

/*current session whether contains user*/
function requiredAuthentication(req,res,next){
	if(req.session.user){
		next();
	}else{
		req.session.error = 'Access denied!';
		res.redirect('/users/login');
	}	
}

/*when regist need check whether the user  has existed */
function isUserExisted(req,res,next){
		User.count({
			username:req.body.username
		},function(err,count){
			if(count==0){
				next();
			}else{
				req.session.error='user exist';
				res.redirect('/users/signup');
			}	
		});
}

module.exports = router;
