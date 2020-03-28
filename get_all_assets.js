module.exports = function(req,res) {
	var username = req.session.currUser;
	require('./get_all_documents.js').then(function(documents) {
		var returnVal = [];
		for(var currDoc of documents) {
			if(!currDoc.assets)
				continue;
			var currAssets = currDoc.assets;
			if(currAssets.length == 0)
				continue;
			for( currAsset of currAssets) {
				currAsset['username'] = currDoc._id;
				returnVal.push(currAsset);
			}
		}
		res.send(returnVal);
	});
}