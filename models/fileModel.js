const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    uploadDate: {
        type: Date,
        defaul: Date.now
    }
});
const File = mongoose.model('File', fileSchema)
module.exports = File;





