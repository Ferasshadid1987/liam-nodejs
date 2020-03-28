function getAllUsernames(documents) {
	return new Promise(function(resolve, reject){
		var usernames = documents.map(function(curr) {
		return curr._id;
		});
		resolve(usernames);
	});
}


const fetchUsernames = require('./get_all_documents.js').then(getAllUsernames, function(err) {
	return err;
});

module.exports = fetchUsernames;