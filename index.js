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
		res.send('<p> Login first!! </p>');
	}
	require('./get_all_assets.js')(req,res);
});

// ------------------ User Assets ---------------------------------------

/* /getUserAssets - GET request which pulls username from session and returns all assets */
app.get('/getUserAssets', function(req,res) {
	if(!req.session.currUser) {
		res.send('<p> Login first!! </p>');
	}
	require('./get_user_assets.js')(req,res);
});


// /newAsset
app.post('/newAsset', function(req,res) {
	if(!req.session.currUser) {
		res.send('<p> Login first!! </p>');
	}
	if(!req.body.url) {
		res.send('<p> Please Provide an Asset URL </p>');
	}
	require('./new_asset.js')(req,res);
});

// /updateAsset
app.post('/updateAsset', function(req,res) {
	if(!req.session.currUser) {
		res.send('<p> Login first!! </p>');
	}
	if(!req.body.url) {
		res.send('<p> Please Provide an Asset URL to Update </p>');
	}
	require('./update_asset.js')(req,res);
});

// ----------------- User Details ------------------------------------------

/* /updateAsset - POST request with a request body of any {url,likes, downloads,setLimasCost}
				- Note say if you want to update likes - first /getUserDetails and add +1 to likes and then make a POST request here */

/* /getUserDetails - GET request which pulls username from session and returns all details */
app.get('/getUserDetails', function(req,res) {
	if(!req.session.currUser) {
		res.send('<p> Login first!! </p>');
	}
	require('./get_user_details.js')(req,res);
});

/* /updateAsset - POST request with a request body of any {url,likes, downloads,setLimasCost}
				- Note say if you want to update likes - first /getUserDetails and add +1 to likes and then make a POST request here */
app.post('/updateUserDetails', function(req,res) {
	if(!req.session.currUser) {
		res.send('<p> Login first!! </p>');
	}
	require('./update_details.js')(req,res);
});


// /newTranscation

// /getAllTransaction

// /newReward

// /getReward

// /newCourse

// /getCourses

app.listen(constants.port, () => console.log(`Listening on port ${constants.port}!`));


// profile
// rewards
// transaction
// courses