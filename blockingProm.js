let rp = require('request-promise');

let urlArray = [
	'http://www.google.com',
	'http://www.mapquest.com',
	'http://www.pcgamer.com',
	'http://www.github.com',
	'http://www.amazon.com',
	'http://www.newegg.com',
];


function getUrls(urlArray) {
	return urlArray.reduce(function(promise, url) {
		return promise.then(function() {
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
		})
	}, Promise.resolve());
}

getUrls(urlArray)
	.then(function() {
		console.log("Done!");
	});
