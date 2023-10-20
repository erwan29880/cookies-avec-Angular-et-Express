const { createHmac } =  require('node:crypto');

/**
 * encryption du pwd avant rentrée en bdd
 */
class Password {

    encrypt(pwd) {
        const secret = 'abcdefg';
        const hash = createHmac('sha256', secret)
                       .update(pwd)
                       .digest('hex');
        return hash;
    }
}


module.exports = Password;