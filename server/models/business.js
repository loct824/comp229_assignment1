const mongoose = require('mongoose');
const conn = require('../config/db.js');
let businessContacts = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
},
{ 
    collection: "businessContacts",
    versionKey: false
}
);

module.exports = conn.model('businessContact',businessContacts);