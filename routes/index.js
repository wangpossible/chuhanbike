var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '楚汉单车俱乐部',active:'active' });
});

router.get('/product', function(req, res) {
  res.render('product', { title: '装备库',active:'active' });
});

router.get('/show', function(req, res) {
  res.render('show', { title: '我型我秀',active:'active' });
});

router.get('/event', function(req, res) {
  res.render('event', { title: '拉帮结派',active:'active' });
});

router.get('/contact', function(req, res) {
  res.render('contact', { title: '联系我们',active:'active' });
});

module.exports = router;
