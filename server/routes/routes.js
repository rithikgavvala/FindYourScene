var express = require('express');
var router = express.Router();
var request = require('request');
var globalAccessToken = "";
var globalAccountId = "7884396f-aefd-4e1a-bea2-5cfe0c55de04";

router.get('/', function(req, res){
    res.render('index')
});

//endpoint template
router.get('/getAccessToken', (req, res) => {
    console.log(req.body);
    var options = {
        url:"https://api.videoindexer.ai/auth/trial/Accounts/"+globalAccountId+"/AccessToken?allowEdit=true",
        headers: {
          'Ocp-Apim-Subscription-Key': '5f2ad32eeb2b4077aee23c9c5de28d7f'
        }
      };
    request(options, function (error, response, body) {
        console.log(response);
        globalAccessToken = body;
        console.log("Access Token recieved");
        console.log("Global access Token is: " + globalAccessToken);
        res.send("Success")
  });
});

router.get('/videoPost',(req,res) => {
    console.log(globalAccessToken);
    console.log(req.body);
    var trimAccessToken =globalAccessToken.substring(1, globalAccessToken.length -1);
    var videoId = req.query.videoId;
    var videoUrl = req.query.videoUrl;
    var apiUrl="https://api.videoindexer.ai/trial/Accounts/"+globalAccountId+"/Videos?name="+videoId+"&videoUrl="+videoUrl+"&accessToken="+trimAccessToken;
    console.log("APIURL: " + apiUrl);
    request(apiUrl, function (error, response, body) {
        console.log(response);
        console.log("UPLOAD SUCCESSFUL")
  });
  
});

module.exports = router;

