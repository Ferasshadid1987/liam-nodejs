const constants = require('./constants.js');
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


module.exports = function(req,res) {
	const valid_keys = ['password', 'firstName', 'lastName', 'email', 'totalLikes', 'totalDownloads', 'totalLimas', 'profile'];
	var updateJson = { ...req.body };

	Object.keys(updateJson).forEach(function(key,index){
		if(valid_keys.indexOf(key) == -1) {
			delete updateJson[key];
		}
	});

	if(isEmpty(updateJson)) {
		res.status(500).json({ message: ' No valid key passed ' });

	}
	const username = req.session.currUser;

	require('./make_connection.js').then(function([collection,client]) {
		var query = { _id: username }
		var updateMongo = {  $set: updateJson }
		client.db(constants.dbName).collection(constants.collectionName).updateOne(query,updateMongo, function(err, response) {
			if(err) {
				throw err;
			}
			res.status(200).json({ message: 'Successfully Updated' });
		});
	});
}

