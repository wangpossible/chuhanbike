var mongoose=require('mongoose');
mongoose.connect('mongodb://wangshoufang:whatfangfang@ds029827.mongolab.com:29827/bike');
module.exports = mongoose;