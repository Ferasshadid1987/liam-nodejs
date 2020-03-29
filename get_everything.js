module.exports = function(req,res) {
	require('./make_connection.js').then(function([collection,client]) {
		require('./get_all_documents.js')([collection,client]).then(function(documents) {
			require('./return_all_courses.js')([collection,client]).then(function(courses) {
				res.send([documents,courses]);
			});
		});
	});
}