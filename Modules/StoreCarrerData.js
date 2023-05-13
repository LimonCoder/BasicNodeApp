const formidable = require("formidable");
const form = new formidable.IncomingForm();
let helper = require('./Helper')
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
            helper.uploadFile(file,response,image_path)
            let responseMsg = 'Successfully Data store'
            helper.appendFile('career.json',JSON.stringify({FastName,LastName,image_path}),response,responseMsg);

        });
    }catch (err){
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(err.message);
    }
}

