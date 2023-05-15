let fs = require('fs');

function readFile(fileName,response){
    fs.readFile(fileName, function(err, data) {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write('500 Internal Server Error');
            return response.end();
        }

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        return response.end();
    });
}

function appendFile(fileName,data,response,responseMsg = ''){
    fs.appendFile(fileName,data+"\n",function(err){
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            return response.end(JSON.stringify(err));
        }
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(responseMsg);
        response.end();
    })
}

function uploadFile(files,response,destination){
    const oldPath = files.photo.filepath;
    fs.copyFile(oldPath, destination, (err) => {
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            return response.end(JSON.stringify(err));
        }
    });
}

function responseWithSuccess(data, message = '', statusCode = 200, responseType = '') {
    return {
        responseTime: Math.floor(Date.now() / 1000),
        responseType: responseType,
        status: statusCode,
        response: 'success',
        msg: message,
        data: data
    };
}
function responseWithError( message = '', statusCode = 500, responseType = '') {
    return {
        responseTime: Math.floor(Date.now() / 1000),
        responseType: responseType,
        status: statusCode,
        response: 'error',
        msg: message
    };
}


module.exports = { readFile,uploadFile,appendFile,responseWithSuccess,responseWithError };