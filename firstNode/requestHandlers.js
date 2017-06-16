var exec = require("child_process").exec; //实现非阻塞
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, postData) {
    console.log("Request 'start' was called");
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">' +
        '<input type="submit" value="upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    exec("ls -lah", function(error, stdout, stderr) {
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(body);
        response.end();
    });

}

function upload(response, request) {
    console.log("Request 'upload' was called");
    response.writeHead(200, { "Content-Type": "text/plain" });
    console.log("about to parse");

    var form = new formidable.IncomingForm();
    form.uploadDir = "tmp";
    form.parse(request, function(error, fields, files) {
        console.log("parse done");
        console.log(files.upload);

        try {
            fs.renameSync(files.upload.path, "/tmp/test.png");
        } catch (e) {
            console.log(e);
        }

        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("received img:</br>");
        response.write("<img src='/show' />");
        response.end();
    });
    /*
        //response.write("lalalalaalalalal" + postData);
        response.write("Hava send" + querystring.parse(postData).text);
        response.end();
        */
}


function show(response) {
    console.log("Request 'show' was called");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(error);
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "img/png" });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;