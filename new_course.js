const constants = require('./constants.js');
module.exports = function(req,res) {
	const valid_keys = ['limas', 'title','description','author']; // except URL
	var updateJson = { ...req.body };

	// Removing redundant keys
	Object.keys(updateJson).forEach(function(key,index){
		if(valid_keys.indexOf(key) == -1) {
			delete updateJson[key];
		}
	});

	updateJson['_id'] = req.body.url

	const username = req.session.currUser;

	// Add default values for keys
	updateJson['username'] =  [];
	updateJson['limas'] = updateJson['limas'] || 0;
	updateJson['title'] = updateJson['title'] || '';
	updateJson['description'] = updateJson['description'] || '';
	updateJson['author'] = updateJson['author'] || '';

	require('./make_connection.js').then(function([collection,client]) {
		client.db(constants.dbName).collection(constants.courseCollectionName).insertOne(updateJson, function(err, response) {
			if (err) throw err;
			res.send('<p> Successfully Added </p>');
				
		});
	});
}