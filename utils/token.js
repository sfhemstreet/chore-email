const jwt = require('jsonwebtoken');

// CHANGE TO PROCESS.ENV
const secret = 'temp_lol_secrettemp_lol_secrettemp_lol_secrettemp_lol_secrettemp_lol_secrettemp_lol_secret';

const checkToken = (req) => {
	return new Promise((resolve, reject) => {
		let token = req.headers['authorization']; 
		console.log('toke 1 - ',token)
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		console.log('toke 2 - ',token)
		if (token) {
			jwt.verify(token, secret, (err, decoded) => {
				if (err) {
					console.log('token err',err);
					reject();
				}
				else {
					console.log('token decoded!',decoded);
					resolve(decoded);
				}
			});
		} 
		else {
			console.log('no token in req');
			reject();
		}	
	})
	
}

module.exports = {
  checkToken: checkToken
}