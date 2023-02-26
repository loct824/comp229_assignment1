const crypto = require('crypto');

// password validation function
function validPassword(password,hash,salt){
    let hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return hash === hashVerify;
};

// password hash value generation function
function genPasswordHash(password){
    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return {salt:salt, hash:genHash};
};

module.exports.validPassword = validPassword;
module.exports.genPasswordHash = genPasswordHash;


