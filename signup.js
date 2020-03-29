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
		require('./make_connection.js').then(function([collection,client]) {
			res.send('<p> New User successfully made </p>');
		});
	});
}



module.exports = function(req,res) {
	if(!req.body.username) {
		res.send('<p> Username field cannot be empty </p>');
		res.end();
		return;
	}
	if(!req.body.password) {
		res.send('<p> Password field cannot be empty </p>');
		res.end();
		return;
	}
	if(!req.body.email) {
		res.send('<p> Email field cannot be empty </p>');
		res.end();
		return;
	}

	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;

	const usernameExistsPromise = require('./get_all_usernames.js').then(function(usernames) {
		return (usernames.indexOf(username) != -1);
	});

	usernameExistsPromise.then(function(usernameExists) {
		if(usernameExists) {
			res.send('<p> Username already exists </p>');
		}
		createNewUser(username,password,res,req,email);
	});
}


