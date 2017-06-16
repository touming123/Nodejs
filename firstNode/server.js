var http = require("http");
var url = require("url");
var formidable = require("formidable");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request from " + pathname + "received");

        route(handle, pathname, response, request);
        /*
                request.setEncoding("utf-8");
                var postData;
                request.addListener("data", function(postDataChunk) {
                    postData += postDataChunk;
                    console.log("received chunk" + postDataChunk);
                });
                request.addListener("end", function() {
                    route(handle, pathname, response, postData);
                });
        */

        //route(handle, pathname, response);
        /*
                response.writeHead(200, { "content-Type": "text/plain" });
                var content = route(handle, pathname);
                response.write(content);
                response.end();
        */
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
}
exports.start = start;