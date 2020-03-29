const constants = require('./constants.js');
function createNewUser(username,password,res,req,email) {
	require('./make_connection.js').then(function([collection,client]) {
		client.db(constants.dbName).collection(constants.collectionName).insertOne({
			_id: username,
			password: password,
			totalLikes: 0,
			totalDownloads: 0,
			totalLimas: 100,
			assets: [],
			firstName: req.body.firstName || '',
			lastName: req.body.lastName || '',
			email: email,
			transactions: [],
			rewards: []
		});

		req.session.currUser = username;
		res.status(200).json({ message: 'New User successfully made ' });
	});
}



module.exports = function(req,res) {
	if(!req.body.username) {
		res.status(500).json({ message: 'Username field cannot be empty' });
		res.end();
		return;
	}
	if(!req.body.password) {
		res.status(500).json({ message: 'Password field cannot be empty' });
		res.end();
		return;
	}
	if(!req.body.email) {
		res.status(500).json({ message: 'Email field cannot be empty' });
		res.end();
		return;
	}

	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	const usernameExistsPromise = require('./get_all_usernames.js')().then(function(usernames) {
		return (usernames.indexOf(username) != -1);
	});

	usernameExistsPromise.then(function(usernameExists) {
		if(usernameExists) {
			res.status(500).json({ message: 'Username already exists ' });
		}
		createNewUser(username,password,res,req,email);
	});
}


