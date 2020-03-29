const constants = require('./constants.js');

module.exports = function(req,res) {
	
	require('./make_connection.js').then(function([collection,client]) {
		require('./return_all_courses.js')([collection,client]).then(function(courses) {
			res.send(courses);
		});
	});
}