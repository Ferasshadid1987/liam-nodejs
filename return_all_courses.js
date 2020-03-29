const constants = require('./constants.js');
function returnCourses([collection,client]) {
	return new Promise(function(resolve, reject){
		client.db(constants.dbName).collection(constants.courseCollectionName).find({}).toArray(function(err, docs) {
			resolve(docs);
		});
	});
}

module.exports = returnCourses;