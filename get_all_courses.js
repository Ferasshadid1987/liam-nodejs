const constants = require('./constants.js');

module.exports = function(req,res) {
	
	require('./make_connection.js').then(function([collection,client]) {
		require('./return_all_courses.js')([collection,client]).then(function(courses) {
			for(course of courses) {
				course.url = course._id;
			}
			res.send(courses);
		});
	});
}