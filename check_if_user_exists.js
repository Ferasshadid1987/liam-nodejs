module.exports = function checkUser(username) {
	var x;
	Promise.resolve()
	require('./get_all_usernames.js').then(function(usernames) {
		return (usernames.indexOf(username) != -1);
	});
}