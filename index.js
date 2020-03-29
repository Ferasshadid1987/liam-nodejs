const express = require('express');
const app = express();
const constants = require('./constants.js');
const bodyParser = require('body-parser');
const session = require('express-session');


//app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use(session({secret: constants.key}));


/* /signup - POST request with query parameter with must {username,password}
	         Default values: totalLikes = 0, totalDownloads = 0, totalLimas = 100, assets = [] */

app.post('/signup', function(req,res) {
	require('./signup.js')(req,res);
});

/* /login - get request with query parameter of username and password */
app.get('/login', function(req,res) {
	require('./login.js')(req,res);
});

/* /fetchAllAssets - GET Request */
app.get('/getAllAssets', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_all_assets.js')(req,res);
});

// ------------------ User Assets ---------------------------------------

/* /getUserAssets - GET request which pulls username from session and returns all assets */
app.get('/getUserAssets', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_user_assets.js')(req,res);
});


// /newAsset
app.post('/newAsset', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	if(!req.body.url) {
		res.status(500).json({ message: 'Please Provide an Asset URL ' });
		res.end();
		return;
	}
	require('./new_asset.js')(req,res);
});

// /updateAsset
app.post('/updateAsset', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	if(!req.body.url) {
		res.status(500).json({ message: ' Please Provide an Asset URL to Update ' });
		res.end();
		return;
	}
	require('./update_asset.js')(req,res);
});

// ----------------- User Details ------------------------------------------

/* /updateAsset - POST request with a request body of any {url,likes, downloads,setLimasCost}
				- Note say if you want to update likes - first /getUserDetails and add +1 to likes and then make a POST request here */

/* /getUserDetails - GET request which pulls username from session and returns all details */
app.get('/getUserDetails', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_user_details.js')(req,res);
});

/* /updateAsset - POST request with a request body of any {url,likes, downloads,setLimasCost}
				- Note say if you want to update likes - first /getUserDetails and add +1 to likes and then make a POST request here */
app.post('/updateUserDetails', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./update_details.js')(req,res);
});


// /newTranscation

app.post('/newTransaction', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	if(!req.body.url) {
		res.status(500).json({ message: 'Please Provide an Asset URL used in transaction ' });
		res.end();
		return;
	}
	if(!req.body.action) {
		res.status(500).json({ message: 'Please provide an action of either like or download ' });
		res.end();
		return;
	}
	if(req.body.action != 'like' && req.body.action != 'download') {
		res.status(500).json({ message: 'Please provide an action of either like or download ' });
		res.end();
		return;
	}
	require('./new_transaction.js')(req,res);
});

// /getAllTransaction

app.get('/getUserTransactions', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_user_transaction.js')(req,res);
});

// /newReward

app.post('/newReward', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	if(!req.body.description && !req.body.limas) {
		res.status(500).json({ message: 'Please provide reward description and limas' });
		res.end();
		return;
	}
	require('./new_user_reward.js')(req,res);
});

// /getReward

app.get('/getUserRewards', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_user_rewards.js')(req,res);
});

// /newCourse
app.post('/newUserCourse', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	if(!req.body.url) {
		res.status(500).json({ message: 'Please provide course url' });
		res.end();
		return;
	}
	require('./new_user_course.js')(req,res);
});

// /getUserCourses
app.get('/getUserCourses', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_user_courses.js')(req,res);
});

// /getAllCourses

app.get('/getAllCourses', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_all_courses.js')(req,res);
});

app.post('/newCourse', function(req,res) {
	if(!req.body.url) {
		res.status(500).json({ message: 'Please provide course url' });
		res.end();
		return;
	}
	require('./new_course.js')(req,res);
});

app.get('/getEverything', function(req,res) {
	if(!req.session.currUser) {
		res.status(500).json({ message: 'Login First!' });
		res.end();
		return;
	}
	require('./get_everything.js')(req,res);
});

app.listen(constants.port, () => console.log(`Listening on port ${constants.port}!`));
