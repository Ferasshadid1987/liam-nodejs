function checkIfPasswordIsCorrect(username,password,res,req) {
	 require('./get_document_by_username.js')(username).then(function(doc) {
	 	console.log(doc);
	 	if(password == doc.password){
	 		 req.session.currUser = username;
	 		 res.status(200).json({ message: 'Welcome!' });
	 		 res.end();
	 		 return;
	 	}
	 	 res.status(500).json({ message: 'Password incorrect' });
	 	 res.end();
	 	 return;
	 })
}

module.exports = function(req,res) {
	if(!req.query.username) {
		res.status(500).json({ message: ' Username field cannot be empty' });
		res.end();
		return;
	}
	if(!req.query.password) {
		res.status(500).json({ message: 'Password field cannot be emptyty' });
		res.end();
		return;
	}
	var username = req.query.username;
	var password = req.query.password;

	const usernameExistsPromise = require('./get_all_usernames.js')().then(function(usernames) {
		return (usernames.indexOf(username) != -1);
	});

	usernameExistsPromise.then(function(usernameExists) {
		console.log(usernameExists);
		if(!usernameExists) {
			res.status(500).json({ message: 'Username does not exist' });
			res.end();
			return;
		}
		else {
		  const passwordCheckPromise = Promise.resolve(checkIfPasswordIsCorrect(username,password,res,req));
		  passwordCheckPromise.then(function(value) {
		  	 console.log(value);
		  });
		}
	});	
}