const constants = require('./constants.js');
module.exports = function(req,res) {
	const username = req.session.currUser;

	var updateJson = {
		description : req.body.description,
		limas: req.body.limas,
		url: req.body.url || ''
	};

	require('./make_connection.js').then(function([collection,client]) {
		var query = { _id: username }
		client.db(constants.dbName).collection(constants.collectionName).findOne(query, function(err, doc) {
			console.log(doc);
			if (err) throw err;
			doc.rewards.push(updateJson);
			var updateMongo = {  $set: { rewards: doc.rewards } }
			client.db(constants.dbName).collection(constants.collectionName).updateOne(query,updateMongo, function(err, response) {
				if(err) {
					throw err;
				}
			
				res.status(200).json({ message: 'Successfully Added' });
				
			});
		});
	});
}