const constants = require('./constants.js');
module.exports = function(req,res) {
	const username = req.session.currUser;
	var updateJson = {
		url: req.body.url,
		progress: req.body.progress || 0
	};

	require('./make_connection.js').then(function([collection,client]) {
		var queryUser = { _id: username };
		var queryCourse = { _id: updateJson.url };

		client.db(constants.dbName).collection(constants.collectionName).findOne(queryUser, function(err, doc) {
			if (err) throw err;
			if(!doc.courses) {
				doc.courses = [];
			}
			doc.courses.push(updateJson);
			require('./return_all_courses.js')([collection,client]).then(function(courses) {
				var courseFound = false;
				var newUsernames = [];
				for(var course of courses) {
					if(course._id == updateJson.url) {
						courseFound = true;
						if(!course.usernames)
							course.usernames = [];
						newUsernames = course.usernames;
						newUsernames.push(username);
						break;
					}
				}

				if(!courseFound) {
					res.status(500).json({ message: 'No such course exists. Enter valid course url' });
				}

				var updateUser = {  $set: { courses: doc.courses } }
				var updateCourse = {  $set: { usernames: newUsernames } }

				client.db(constants.dbName).collection(constants.courseCollectionName).updateOne(queryCourse, updateCourse, function(err, responseCourse) {
					if(err) {
						throw err;
					}
			
					client.db(constants.dbName).collection(constants.collectionName).updateOne(queryUser,updateUser, function(err, response) {
						if(err) {
							throw err;
						}
					
						res.status(200).json({ message: 'Successfully Added' });
						
					});
				});
			});
		});
	});
}