function checkIfPasswordIsCorrect(username,password,res,req) {
	 require('./get_document_by_username.js')(username).then(function(doc) {
	 	console.log(doc);
	 	if(password == doc.password){
	 		 req.session.currUser = username;
	 		 res.send('<p> Welcome! </p>') ;
	 	}
	 	 res.send('<p> Password incorrect </p>');
	 })
}

module.exports = function(req,res) {
	if(!req.query.username) {
		res.send('<p> Username field cannot be empty </p>');
		res.end();
		return;
	}
	if(!req.query.password) {
		res.send('<p> Password field cannot be empty </p>');
		res.end();
		return;
	}
	var username = req.query.username;
	var password = req.query.password;

	const usernameExistsPromise = require('./get_all_usernames.js').then(function(usernames) {
		return (usernames.indexOf(username) != -1);
	});

	usernameExistsPromise.then(function(usernameExists) {
		console.log(usernameExists);
		if(!usernameExists) {
		res.send('<p> Username does not exist </p>');
		}
		else {
		  const passwordCheckPromise = Promise.resolve(checkIfPasswordIsCorrect(username,password,res,req));
		  passwordCheckPromise.then(function(value) {
		  	 console.log(value);
		  });
		}
	});	
}