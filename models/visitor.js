const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const visitorSchema = new Schema({
    visitorName: { type: String, require: true},
    visitorEmail: { type: String, require: true},
    visitorPhone: { type: String, require: true},
    visitorDate:  {type: Date, default: Date.now },
    visitorTime: {type: Date, default: Date.now }
    
});


module.exports = mongoose.model('visitor', visitorSchema);
