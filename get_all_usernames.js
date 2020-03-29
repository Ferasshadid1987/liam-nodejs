module.exports = function getAllUsernames() {
	return new Promise(function(resolve, reject){
		require('./make_connection.js').then(function([collection,client]) {
			require('./get_all_documents.js')([collection,client]).then(function(documents) {
				var usernames = documents.map(function(curr) {
				return curr._id;
				});
				resolve(usernames);
			});
		});
	});
}