var express = require('express');
var router = express.Router();
var meetingDao = require('../dao/meetingDao');

router.get('/dayMeetings', function(req, res, next) {

});

router.get('/weeklyMeetings', function(req, res, next) {

});

router.get('/monthlyMeetings', function(req, res, next) {

});

router.post('/meetingBook', function(req, res, next) {

});//会议预定

router.post('/currentMeeting', function(req, res, next) {

});//当前会议

router.post('/meetingList', function(req, res, next) {

});//会议列表


module.exports = router;