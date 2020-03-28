function createNewUser(username,password,res) {
	require('./make_connection.js').then(function(collection) {
		collection.insertOne({
			_id: username,
			Password: password,
			totalLikes: 0,
			totalDownloads: 0,
			totalLimas: 100,
			assets: []
		});
		res.send('<p> New User successfully made </p>');
	});
}



module.exports = function(req,res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log(req.body);
	if(!username)
		res.send('<p> Username field cannot be empty </p>');
	if(!password)
		res.send('<p> Password field cannot be empty </p>');

	const usernameExistsPromise = require('./get_all_usernames.js').then(function(usernames) {
		return (usernames.indexOf(username) != -1);
	});

	usernameExistsPromise.then(function(usernameExists) {
		if(usernameExists) {
			res.send('<p> Username already exists </p>');
		}
		createNewUser(username,password,res);
	});
}


