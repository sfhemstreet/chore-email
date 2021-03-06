const jwt = require('jsonwebtoken');


const checkToken = (req) => {
	return new Promise((resolve, reject) => {
		let token = req.headers['authorization']; 
		
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length);
		}
		if (token) {
			jwt.verify(token, process.env.TOKEN_SECRET, {algorithm: 'HS256', expiresIn: '2d'}, (err, decoded) => {
				if (err) {
					console.log('token err',err);
					reject();
				}
				else {
					//console.log('token decoded!',decoded);
					resolve(decoded);
				}
			})
			.catch(err => console.log(err))
		} 
		else {
			console.log('no token in req');
			reject();
		}	
	});
}

module.exports = {
  checkToken: checkToken
}