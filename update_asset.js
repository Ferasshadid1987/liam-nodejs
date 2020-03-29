const constants = require('./constants.js');
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


module.exports = function(req,res) {
	const valid_keys = ['url', 'likes', 'downloads', 'setLimasCost', 'name'];
	var updateJson = { ...req.body };

	Object.keys(updateJson).forEach(function(key,index){
		if(valid_keys.indexOf(key) == -1) {
			delete updateJson[key];
		}
	});

	if(isEmpty(updateJson)) {
		res.status(500).json({ message: 'No valid key passed' });
		res.end();
		return;
	}
	const username = req.session.currUser;
	const url = req.body.url;

	require('./make_connection.js').then(function([collection,client]) {
		var query = { _id: username }
		client.db(constants.dbName).collection(constants.collectionName).findOne(query, function(err, doc) {
			if (err) throw err;
			var flag = false;
			for(var asset of doc.assets) {
				if(asset.url == url) {
					asset.likes = updateJson.likes || asset.likes;
					asset.downloads = updateJson.downloads || asset.downloads;
					asset.setLimasCost = updateJson.setLimasCost || asset.setLimasCost;
					asset.name = updateJson.name || asset.name;
					flag = true;
					break;
				}
			}
			if(!flag) {
				res.status(500).json({ message: ' No such asset URL found' });
				res.end();
				return;
			}

			var updateMongo = {  $set: { assets: doc.assets } }
			client.db(constants.dbName).collection(constants.collectionName).updateOne(query,updateMongo, function(err, response) {
				if(err) {
					throw err;
				}
				res.status(200).json({ message: 'Successfully Updated' });
			});
				
		});
	});
}




