var requirejs = require('requirejs');

requirejs.config({
    nodeRequire:require
})

requirejs(['connect', 'http', 'url', 'proxy-middleware', 'serve-static'], function(connect, http, url, proxy, serveStatic) {
    var app = connect();
		
	//app.use(serveStatic(__dirname + '/../'));
	
	app.use('/blockchain', proxy(url.parse('http://blockexplorer.com')));
	
	//create node.js http server and listen on port
	http.createServer(app).listen(8080);
});