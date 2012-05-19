var http = require( "http" ),
	spawn = require( "child_process" ).spawn;
var wkhtml = process.platform === "darwin" ? "/Applications/wkhtmltopdf.app/Contents/MacOS/wkhtmltopdf" : "./wkhtmltopdf-amd64";
http.createServer(function( req, res ){
	res.writeHead( 200, {
		"Content-Type": "application/pdf"
	});
	var wkhtmlProcess = spawn( wkhtml, [ "http://google.com", "-" ] );
	
	wkhtmlProcess.stderr.on( "data", function( data ){
		console.error( data.toString() );
	});
	
	wkhtmlProcess.stdout.pipe( res );
}).listen( process.env.PORT_WWW||8080 );
