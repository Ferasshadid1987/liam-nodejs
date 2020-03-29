const constants = require('./constants.js');
module.exports = function(req,res) {
	var updateJson = { url: req.body.url } ;

	const username = req.session.currUser;

	if(req.body.action == 'like') {
		updateJson.action = 'like';
		updateJson.limas = 0;
	}
	else {
		updateJson.action = 'download';
		updateJson.limas = req.body.limas || 0;
	}

	require('./make_connection.js').then(function([collection,client]) {
		var query = { _id: username }
		client.db(constants.dbName).collection(constants.collectionName).findOne(query, function(err, doc) {
			console.log(doc);
			if (err) throw err;
			doc.transactions.push(updateJson);
			var updateMongo = {  $set: { transactions: doc.transactions } }
			client.db(constants.dbName).collection(constants.collectionName).updateOne(query,updateMongo, function(err, response) {
				if(err) {
					throw err;
				}
			
				res.status(200).json({ message: 'Successfully Added' });
				
			});
		});
	});
}