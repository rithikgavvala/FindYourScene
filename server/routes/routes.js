var express = require('express');
var router = express.Router();
var request = require('request');
var globalAccessToken = "";
var globalAccountId = "7884396f-aefd-4e1a-bea2-5cfe0c55de04";
var globalVideoName = "";
var globalVideoId = "";
var startendTimes = {};
// var axios = require('axios');
// var got = require('got');

router.get('/', function(req, res){
    res.render('index')
});

//endpoint template
router.get('/getAccessToken', (req, res) => {
    var options = {
        url:"https://api.videoindexer.ai/auth/trial/Accounts/"+globalAccountId+"/AccessToken?allowEdit=true",
        headers: {
          'Ocp-Apim-Subscription-Key': '5f2ad32eeb2b4077aee23c9c5de28d7f'
        }
      };

    request(options, function (error, response, body) {
        globalAccessToken = body;
        console.log("Access Token recieved");
        console.log("Global access Token is: " + globalAccessToken);
        res.send("success");
  });
});

router.post('/videoPost', (req,res) => {
    
    var trimAccessToken = globalAccessToken.substring(1, globalAccessToken.length -1);
    var videoId = req.params.videoId;
    globalVideoName = videoId;
    var videoUrl = req.params.videoUrl;
    var apiUrl="https://api.videoindexer.ai/trial/Accounts/"+globalAccountId+"/Videos?name="+videoId+"&videoUrl="+videoUrl+"&accessToken="+trimAccessToken;

    console.log("APIURL: " + apiUrl);
    var remote = request(apiUrl);
    req.pipe(remote);
    remote.pipe(res);

    console.log(remote.body);

    res.send("success");

  });

router.get('/getVideos', (req, res) => {
        var trimAccessToken = globalAccessToken.substring(1, globalAccessToken.length -1);
        var options = {
            url:"https://api.videoindexer.ai/trial/Accounts/"+globalAccountId+"/Videos?pageSize=25&skip=0&accessToken="+trimAccessToken,
            headers: {
              'Ocp-Apim-Subscription-Key': '5f2ad32eeb2b4077aee23c9c5de28d7f'
            }
          };
        request(options, function (error, response, body) {
            if(response.status = "200"){
                console.log("List Videos Received");
                var obj = JSON.parse(response.body);
                console.log(globalVideoName);
                for(var i = 0; i < obj.results.length; i++) {
                        //TODO: change "test3" to globalName
                        if(obj.results[i].name == "Monsters, Inc. - Trailer") {
                                console.log(obj.results[i].id);
                                globalVideoId = obj.results[i].id;
                        }
                }
                res.send("success");
             }
        });
    });

router.get('/getEmotionTimes', (req, res) => {
    var trimAccessToken = globalAccessToken.substring(1, globalAccessToken.length -1);
    var options = {
        url:"https://api.videoindexer.ai/trial/Accounts/"+globalAccountId+"/Videos/"+globalVideoId+"/Index?accessToken="+trimAccessToken,
        headers: {
          'Ocp-Apim-Subscription-Key': '5f2ad32eeb2b4077aee23c9c5de28d7f'
        }
      };
    request(options, function (error, response, body) {
        if(response.status = "200"){
                console.log("Get Emotions using video index");
                var obj = JSON.parse(response.body);
                var emotionTimes = obj.summarizedInsights.emotions[0];
                if (emotionTimes.type == "Fear") {
                        var times = emotionTimes.appearances;
                        for(var i = 0; i < times.length; i++) {
                                startendTimes[times[i].startTime] = times[i].endTime
                        }
                        for (var key in startendTimes) {
                                if (startendTimes.hasOwnProperty(key)) {           
                                    console.log(key, startendTimes[key]);
                                }
                        }
                }
                res.send(startendTimes);
        }
  });
});

module.exports = router;

