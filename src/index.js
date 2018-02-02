const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const { URL } = require('url');


const got = require('got');
const { JSDOM } = require('jsdom');

const { download, getClient, filterList, pathParse } = require('./libs');

// Node <= 7 
module.exports = url => {
	url = new URL(url);

	return new Promise((resolve, reject) => {
		got(url.href).then(({body}) => {
			const {window} = new JSDOM(body);
			const {document} = window;

			document.querySelectorAll('script').forEach(script => {
				if ( !script.innerHTML.includes('dlbutton') ) script.remove();
			})

			url.pathname = eval(document.querySelector('script').innerHTML.split(';')[0].trim().split('=')[1].trim());

			resolve(url.href);
		}).catch(e => reject);
	})
}