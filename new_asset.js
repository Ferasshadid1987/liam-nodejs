const constants = require('./constants.js');
module.exports = function(req,res) {
	const valid_keys = ['url', 'likes', 'downloads', 'setLimasCost'];
	var updateJson = { ...req.body };

	// Removing redundant keys
	Object.keys(updateJson).forEach(function(key,index){
		if(valid_keys.indexOf(key) == -1) {
			delete updateJson[key];
		}
	});

	const username = req.session.currUser;

	// Add default values for keys
	for(key of valid_keys) {
		updateJson[key] = updateJson[key] || 0;
	}

	console.log('ddd');
	require('./make_connection.js').then(function([collection,client]) {
		var query = { _id: username }
		client.db(constants.dbName).collection(constants.collectionName).findOne(query, function(err, doc) {
			console.log(doc);
			if (err) throw err;
			doc.assets.push(updateJson);
			console.log(doc.assets);
			var updateMongo = {  $set: { assets: doc.assets } }
			client.db(constants.dbName).collection(constants.collectionName).updateOne(query,updateMongo, function(err, response) {
				if(err) {
					throw err;
				}
			
				res.send('<p> Successfully Added </p>');
				
			});
		});
	});
}