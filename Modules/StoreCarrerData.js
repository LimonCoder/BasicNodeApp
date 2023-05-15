const formidable = require("formidable");
const form = new formidable.IncomingForm();
let helper = require('./Helper')
let db = require('./Database');
module.exports = function (request,response){
    try{
        form.parse(request, (err, fields, file) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Internal Server Error');
                return;
            }
            const FastName = fields.fname;
            const LastName = fields.lname;
            const image_path = process.env.ASSET_URL+'images/' + file.photo.originalFilename;
            // upload file
            helper.uploadFile(file,response,image_path);
             // store in db
            (async function () {
                try {
                    const sql = "INSERT INTO node_test (fname, lname, image_path) VALUES (?, ?, ?)";
                    let isSave = await db.executeQuery(sql,[FastName,LastName,image_path]);
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    let responseJson = helper.responseWithSuccess(isSave, 'Data Store Successfully', 200, 'Success')
                    response.write(JSON.stringify(responseJson));
                    response.end();
                } catch (e) {
                    helper.responseWithError(e.message,500,'error');
                }
            })();
            let responseMsg = 'Successfully Data store'
            helper.appendFile('career.json',JSON.stringify({FastName,LastName,image_path}),response,responseMsg);

        });
    }catch (err){
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(err.message);
    }
}

