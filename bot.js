//Insances et variables
var fetch = require("node-fetch");
var Twit = require('twit'); 
var config = require('./config'); 
var T = Twit(config);

//Fonction request API
async function getISSLat() {
    await fetch('http://api.open-notify.org/iss-now.json')
      .then((data) => {
        return data.json();
      }).then(data => {
        console.log('[*] ISS Latitude: ' + data.iss_position.latitude);
        return Promise.resolve(data.iss_position.latitude);
      })
}

async function getISSLong() {
    await fetch('http://api.open-notify.org/iss-now.json')
      .then((data) => {
        return data.json();
      }).then(data => {
        console.log('[*] ISS Longitude: ' + data.iss_position.longitude);
        return Promise.resolve(data.iss_position.longitude);
      })
}

//Fonction de Tweet
function tweetIt(text, text) {   
    var tweet = {
        status: text + text
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
    console.log('[*] Async function is running...')
    latitude = await getISSLat();
    longitude = await getISSLong();
    return latitude + ' & ' + longitude

}

//Script Bot
console.log('[*] Twitter Bot initialization.');
tweetISSLocation().then(data => console.log(data));

