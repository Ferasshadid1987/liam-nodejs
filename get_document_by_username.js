module.exports = function getDocumentByUsername(username) {
	return new Promise(function(resolve, reject){
		require('./make_connection.js').then(function([collection,client]) {
			require('./get_all_documents.js')([collection,client]).then(function(documents) {
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

	})
			
}