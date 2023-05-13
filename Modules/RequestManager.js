let db = require('./Database');
let helper = require('./Helper')
let storeCareerData = require('./StoreCarrerData');
function handleRequest(request, response) {
    let endpoint = request.url;
    let method = request.method.toLowerCase();
    let fileName;

    if (endpoint === '/') {
        fileName = 'home.html';
    } else if (endpoint === '/about') {
        fileName = 'about.html';
    } else if (endpoint === '/career') {
        fileName = 'career.html';
    } else if (endpoint === '/career/store' && method === "post" ) {
        storeCareerData(request, response);
        return;
    }else if(endpoint === "/bank" && method === "get" ){
        db.executeQuery('SELECT * FROM bank', [], (err, results) => {
            if (err) {
                console.error('Error executing the query:', err);
                return;
            }
            response.writeHead(200, { 'Content-Type': 'application/json' });
            let responseJson = helper.responseWithSuccess(results,'Data found Successfully',200,'Success')
            response.write(JSON.stringify(responseJson));
            response.end();
        });
        return;
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.write('404 Not Found');
        response.end();
    }
    helper.readFile(fileName,response)
}
module.exports  = handleRequest;