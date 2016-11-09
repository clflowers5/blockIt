let rp = require('request-promise');
let blockIt = require('./blockIt').blockIt;
let throttleIt = require('./blockIt').throttleIt;
let paceIt = require('./blockIt').paceIt;

let urlArray = [
	'http://www.google.com',
	'http://www.mapquest.com',
	'http://www.pcgamer.com',
	'http://www.github.com',
	'http://www.amazon.com',
	'http://www.newegg.com',
];

function getUrl(url) {
	return new Promise(function(resolve, reject) {
		console.log("Getting url: " + url);

		rp(url)
			.then(function(data) {
				console.log("Got " + url);
				resolve(data);
			})
			.catch(function(err) {
				console.log("Error for " + url + ":" + err.message);
				reject(err);
			});
	});
}

// blockIt(urlArray, getUrl);

// throttleIt(urlArray, getUrl, 5000);

paceIt(urlArray, getUrl, 1);
