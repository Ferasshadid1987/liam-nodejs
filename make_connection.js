
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://DbAdmin:DbAdmin@cluster0-xelv3.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const constants = require('./constants.js');

module.exports = new Promise(function(resolve, reject){
	client.connect(err => {
		const collection = client.db(constants.dbName).collection(constants.collectionName);
		if(err) {
			reject(err);
		}
		resolve([collection,client]);
	})
});

