//Insances et variables
var fetch = require("node-fetch");
var Twit = require('twit');
var Cron = require('node-cron'); 
var config = require('./config'); 
var T = Twit(config);

//Fonction request API
async function getISSLocation() {
    const resp = await fetch('http://api.open-notify.org/iss-now.json')
    return resp
}

//Fonction de Tweet
function tweetIt(text) {   
    var tweet = {
        status: text 
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if(err) {
            console.log('[*] Please check code, something went wrong.')
        } else {
            console.log('[*] Tweet posted.');
        }   
    }
}

//Fonction tweet ISS Location
async function tweetISSLocation() {
    let date = new Date();
    console.log('[*] Async function is running...')
    const longitude = await getISSLocation().then(data => {return data.json()}).then(data => {return data.iss_position.longitude});
    const latitude = await getISSLocation().then(data => {return data.json()}).then(data => {return data.iss_position.latitude});
    console.log('[*] ISS Longitude: ' + longitude + ' & ISS Latitude: '+  latitude);
    const tweet = "🚀" + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + " à "  + date.getHours() + ":" + date.getMinutes() + "\n📌Latitude de l'ISS: " + latitude + "\n📌Longitude de l'ISS: " + longitude
    tweetIt(tweet);

}

//Script Bot
console.log('[*] Twitter Bot initialization.');
tweetISSLocation();

