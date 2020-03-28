module.exports = function getDocumentByUsername(username) {
	return new Promise(function(resolve, reject){
		require('./get_all_documents.js').then(function(documents) {
			var flag = false;
			for( var currDoc of documents) {
				if(currDoc._id == username) {
					resolve(currDoc);
					flag = true;
					break;
				}
			}
			if(!flag)
				resolve({});
		});
	});
}