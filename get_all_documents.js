function getDocuments(collection) {
	return new Promise(function(resolve, reject){
		collection.find({}).toArray(function(err, docs) {
			resolve(docs);
		});
	});
}

const fetchCollection = require('./make_connection.js').then(getDocuments, function(err) {
	return err;
});

module.exports = fetchCollection;
