module.exports = function(req,res) {
	var username = req.session.currUser;
	require('./get_document_by_username.js')(username).then(function(doc) {
		var dup = { ...doc }
		console.log(doc);
		delete dup.assets;
		delete dup.transactions;
		delete dup.rewards;
		delete dup.courses;
		res.send(dup);
	});
}