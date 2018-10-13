# ZippyShare Extractor 
> Extract ZippyShares download link from the given url magically :sparkles: 

## Why
It all started when I had to download a file divided into 150 `.rar` files all from zippyshare, as long as they were 2/3 you could do it. But not this time, considering how much they were it could take too much time lost at escaping banners and ADS.

## The problem
So once I understand how zippyshare protects itself from `HTTP` requests it was simple. This module analyzes the `HTML` code in the page and runs a script integrated into the zippyshare page which generates a link to the file to be downloaded. This script should self-execute when a user access to the page but no browser no `<script>` runs.

So the solution was to clean the page from all the ADS scripts and other superfluous ones and extract the line that generates the path to the file that needs to be downloaded, then thanks to the `eval` function you can easily run it and get the file path.

## The ZippyShare Script 
#### [1st week of March 2018]
![zippyshare-script](https://user-images.githubusercontent.com/16429579/37145976-bc9b027c-22c2-11e8-82de-c73fd8f0998d.png)

#### Update: 14 Oct 2018
The script has changed, now it's really simple.. 
```js
document.getElementById('dlbutton').href = "/d/GtIlB8Sw/" + (715980 % 51245 + 715980 % 913) + "/path/to/file"
// .. useless code
```

## Installation 
Simply add `zippyshare-extractor` to your dependecies.

```sh 
	$ sudo yarn add zippyshare-extractor

	$ npm i zippyshare-extractor --save
```

## Usage
```js
	import zippy from 'zippy';
	import download from 'simple-download';

	zippy(zippyshare_url).then(url => {
		// do something with the download url

		// Custom download function.
		download({
			path: '~/desktop',
			file: url.split('/').pop(),
			url: url
		}, (pos, item) => {
			console.log(`${item} downloaded successfully.`)
		})
	}).catch(e => { throw e })
``` 

--------
<p align="center">
    Follow me on
    <br>
	<a href="https://twitter.com/rawnlydev">Twitter</a> • <a href="https://instagram.com/fede.vitale">Instagram</a>  • <a href="https://github.com/rawnly">GitHub</a> 
</p>
