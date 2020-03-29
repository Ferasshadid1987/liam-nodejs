const constants = require('./constants.js');
function getDocuments([collection,client]) {
	return new Promise(function(resolve, reject){
		client.db(constants.dbName).collection(constants.collectionName).find({}).toArray(function(err, docs) {
			resolve(docs);
		});
	});
}

const fetchCollection = require('./make_connection.js').then(getDocuments, function(err) {
	return err;
});

module.exports = getDocuments;
