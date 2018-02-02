module.exports.filterList = file => {
	fs.readFileSync(file, 'utf8').split('\r\n').filter(url => {
		url = url.trim().toLowerCase();
		return url !== '' && url.length > 1;
	});
}

module.exports.download = (url, dest, cb) => {
	const client = getClient(url);
	var file = fs.createWriteStream(dest);

  var request = client.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
      cb();
    });
  });
}

module.exports.getClient = url => {
	url = new URL(url);
	return url.protocol === 'https:' ? https : http;
}

module.exports.pathParse = pth => {
	const { homeDir } = require('os');

	pth = pth.toLowerCase().trim();

	if ( pth.includes('~') ) {
		pth.replace('~', homeDir);
	}

	return pth;
}