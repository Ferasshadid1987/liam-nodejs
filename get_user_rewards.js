module.exports = function(req,res) {
	var username = req.session.currUser;
	require('./get_document_by_username.js')(username).then(function(doc) {
		res.send(doc.rewards);
	});
}