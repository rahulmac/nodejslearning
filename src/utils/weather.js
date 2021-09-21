const request = require('request')
const access_key = '854e656aabba9ee48e185250544e5989'
const location = "20.5937,78.9629"
const url = "http://api.weatherstack.com/current?access_key=04f4e2d39585f5f9edaa0fcf6ff016f3&query=india"

request({url:url,json:true}, function (error, response, body) {
    console.log('currently the temperatue is' + body.current.temperature + ' and the time zone is '+ body.location.timezone_id);
});
