const fs = require('fs');
const mime = require('mime');
const logger = require('../config/Logger')

module.exports = {
    uploadImage : function(folder, base64Image) {
        var matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
    
        if (matches.length !== 3) {
            return new Error('Invalid input string');
        }
    
        response.type = matches[1];
        response.data = Buffer.from(matches[2], 'base64');
        let decodedImg = response;
        let imageBuffer = decodedImg.data;
        let type = decodedImg.type;
        let extension = mime.extension(type);
        let fileName = "image." + extension;
        try {
            fs.writeFileSync(folder + fileName, imageBuffer, 'utf8');
            return folder + fileName;
        } catch (e) {
            logger.error(e);
        }
        return false;
    }
}