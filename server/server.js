var requirejs = require('requirejs');

requirejs.config({
    nodeRequire:require
})

requirejs(['connect', 'http', 'url', 'proxy-middleware', 'serve-static'], function(connect, http, url, proxy, serveStatic) {
    var app = connect();
		
	app.use(serveStatic(__dirname + '/../'));
	
	app.use('/blockexplorer', proxy(url.parse('http://blockexplorer.com')));
	
	app.use('/blockchain', proxy(url.parse('https://blockchain.info/')));
	
	//create node.js http server and listen on port
	http.createServer(app).listen(8080);
});