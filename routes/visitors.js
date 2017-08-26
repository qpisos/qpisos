const express = require('express');
const visitor = require('../models/visitor');
const router = express.Router();
console.log ('entra modelo visitor')


router.get('/new', (req, res, next) => {
  console.log ('entra ruta visitor/new')

  res.render('visitors/new', {
    visitorName: req.query.visitorName,
    visitorTime: req.query.visitorTime,
    visitorDate: req.query.visitorDate
  
  })});

router.post('/', (req, res, next) => {
  const newVisitor = new visitor({
    visitorName: req.body.visitorName,
    visitorDate: req.body.visitorDate,
    //visitorTime: req.body.visitorTime
 
  });
console.log(newVisitor);
  newVisitor.save((err) => {
    if (err) {
      res.render('index');
    } else {
      res.redirect('/visitors/new?visitorName=' + req.body.visitorName   + '     you are going to send an email asking for a visit on    '+  req.body.visitorDate + 'at  '+ req.body.visitorTime );
  
    }
  });
});



module.exports = router;
