const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config/keys');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signin = (req, res, next) => {
  res.send({token: tokenForUser(req.user)})
}


exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || !password || !firstName || !lastName) {
    return res.status(422).send({error: 'You must fill out all the fields'});
  }
	//check if a user exist
	User.findOne({ email }, function(err, existingUser) {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}
		// Create a user object to save, using values from incoming JSON
		const user = new User({
			firstName: firstName,
			lastName: lastName,
			email: email,
      password: password
		});

		user.save(function(err) {
			if (err) {
				return next(err);
			}

			res.json({token: tokenForUser(user)});
		});
	});
};
