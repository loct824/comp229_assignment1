const mongoose = require('mongoose');

require('dotenv').config();

// connect to Mongodb server using the connection string saved in the .env file

const conn = mongoose.createConnection(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// creates schema for the user. The hash and salt is derived from user's password
const UserSchema = new mongoose.Schema(
    {
        username: String,
        hash: String,
        salt: String
    }
);

const User = conn.model('User', UserSchema);

module.exports = conn;