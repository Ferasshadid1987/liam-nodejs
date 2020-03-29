module.exports = function(req,res) {
	require('./make_connection.js').then(function([collection,client]) {
		var username = req.session.currUser;
		require('./get_document_by_username.js')(username).then(function(doc) {
			require('./return_all_courses.js')([collection,client]).then(function(courses) {
				res.send({
					user: doc,
					courses: courses
				});
			});
		});
	});
}