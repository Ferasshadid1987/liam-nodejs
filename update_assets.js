const constants = require('./constants.js');
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


module.exports = function(req,res) {
	const valid_keys = ['password', 'firstName', 'lastName', 'email', 'totalLikes', 'totalDownloads', 'totalLimas'];
	var updateJson = { ...req.body };

	Object.keys(updateJson).forEach(function(key,index){
		if(valid_keys.indexOf(key) == -1) {
			delete updateJson[key];
		}
	});

	if(isEmpty(updateJson)) {
		res.send('<p> No valid key passed </p>');
	}
	const username = req.session.currUser;

	require('./make_connection.js').then(function([collection,client]) {
		var query = { _id: username }
		var updateMongo = {  $set: updateJson }
		client.db(constants.dbName).collection(constants.collectionName).updateOne(query,updateMongo, function(err, response) {
			if(err) {
				throw err;
			}
			require('./get_all_documents.js').then(function() {
				require('./get_document_by_username.js')(username).then(function() {
					res.send('<p> Successfully Updated </p>');
				});
					
			});
		});
	});
}

