const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const { URL } = require('url');


const got = require('got');
const { JSDOM } = require('jsdom');


/**
 * @name Zippy
 * 
 * @version 0.2.0
 * @author Federico Vitale <fedevitale99[at]gmail.com>
 * 
 * @param {String} url
 *
 * @example
 * // with custom download function
 * zippy(url).then(url => download(url))
 *
 * @returns {String} - Direct url of the file
 */
module.exports = url => {
	url = new URL(url);

	return new Promise((resolve, reject) => {
		got(url.href).then(({body}) => {
			const {window} = new JSDOM(body);
			const {document} = window;

			// Remove all useless scripts
			document.querySelectorAll('script').forEach(script => {
				if ( !script.innerHTML.includes('dlbutton') ) script.remove();
			})

			// Clean the script content
			const rows = document.querySelector('script').innerHTML.split('\n').filter( row => row !== '' )
				.slice(0, 4)
				.map((item, index) => {
				if ( index == 3 ) {
					return item.replace("document.getElementById(\'dlbutton\').href = ", '').trim();
				}

				return item.trim();
			});

			const script = rows[0].split('=').pop()
			const path = eval(script)

			// update the pathname of the url
			url.pathname = path;

			// return it
			resolve(url.href);
		}).catch(e => reject);
	})
}
