var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index')
});


//endpoint template

router.route('/testPost').post((req,res) => {
    console.log(req.body);
    res.send({success: "nice"});
    //model.save((err) => {
    //  res.send('success');
    // })
});



module.exports = router;
