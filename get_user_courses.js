const constants = require('./constants.js');

module.exports = function(req,res) {
	var username = req.session.currUser;
	require('./get_document_by_username.js')(username).then(function(doc) {
		require('./make_connection.js').then(function([collection,client]) {
			require('./return_all_courses.js')([collection,client]).then(function(courses) {
				var userCourses = [];
				if(doc.courses.length == 0) {
					res.send('<p> No courses found for the user </p>');
					res.end();
					return;
				}
				
				for(var course of doc.courses) {
					var courseInfo = {};

					for(var cs of courses) {
						console.log(cs['_id']);
						if(cs['_id'] == course.url) {
							console.log(course);
							courseInfo = course;
						}
					}
					console.log(courseInfo);
					delete courseInfo.usernames;
					delete courseInfo._id;
					courseInfo.progress = course.progress;
					courseInfo.url = course.url;
					userCourses.push(courseInfo);
				}
				res.send(userCourses);

			});
		});
	});
}

// www.course2.com

// www.course2.com

// www.course2.com