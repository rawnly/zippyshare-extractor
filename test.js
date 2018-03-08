const zippy = require('.');
const sampleURL = "http://www11.zippyshare.com/v/HXTi3EyE/file.html";

// Let's test it
zippy(sampleURL).then(directURL => {
	console.log(directURL);
}).catch(e => {
	throw new Error(e);
})