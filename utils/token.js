const jwt = require('jsonwebtoken');

// CHANGE TO PROCESS.ENV
const secret = 'temp_lol_secret';

const checkToken = (req) => {
	let token = req.headers['x-access-token'] || req.headers['authorization']; 
	if (token.startsWith('Bearer ')) {
    	// Remove Bearer from string
    	token = token.slice(7, token.length);
  	}
  	if (token) {
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				console.log('token err',err);
				return false;
			}
			else {
				console.log('token decoded!',decoded);
				return true;
			}
    	});
	} 
	else {
		console.log('no token in req');
    	return false;
    }
}

module.exports = {
  checkToken: checkToken
}