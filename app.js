// require(node引入)
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

// 抓取網站
request({
	uri: 'https://www.ptt.cc/bbs/Soft_Job/index.html',
	method: 'GET'
}, function(error, response, body) {
	if(error) {
		return;
	}
	
// 解析網站內容
	var $ = cheerio.load(body);

	var results = [];
	var titles = $('.r-ent a'); //抓出需要內容
	for(var i = 0; i < titles.length; i++) {
		results.push({ 			//把內容放入array
			title: $(titles[i]).text(),
			link: $(titles[i]).attr('href')
		});
	}
	console.log(results);

// 儲存爬蟲資料
	fs.writeFileSync('results.json', JSON.stringify(results));
});

// 爬蟲重點
// 爬取 解析 儲存