# Welcome to Digital Assets Hub!

This is a gamification system that help kids to earn digital currencies for their creations

# Backend Docs

## Endpoints

### /signup
- POST (*All POST requests expect Content-Headers of* **application/x-www-form-urlencoded** )
- Request body parameters required - 'username' , 'password' and 'email'
- Other optional body parameters- 'firstName' and 'lastName'
- Return HTML:
   -  <p> New User successfully made </p>
   - <p> Username already exists </p>
   - <p> Username field cannot be empty </p>
   - <p> Password field cannot be empty </p>
   - <p> Email field cannot be empty </p>

### /login
- GET request 
- Two URL query parameters required - 'username' and 'password'
- Return HTML:
   - <p> Welcome! </p>
   - <p> Password incorrect </p>
   - <p> Username does not exist </p>
   - <p> Username field cannot be empty </p>
   - <p> Password field cannot be empty </p>

### /getUserDetails 
- GET request 
- Returns JSON with keys -  'password', 'email', 'profile' (profile pic), 'totalLimas', 'firstName', 'lastName', 'totalDownloads', 'totalLikes'

### /updateUserDetails
- POST request
- A request body with any of the above keys can be - 'password', 'email', 'profile' (profile pic), 'totalLimas', 'firstName', 'lastName', 'totalDownloads', 'totalLikes' can be passed and will be updated
- Return
   - <p> Successfully Updated </p>
   - <p> No valid key passed </p>
   
### /getUserAssets
- GET request 
- Returns an array of JSONs. Each JSON has these keys - 'url' , 'likes' , 'downloads' , 'setLimasCost'

### /getAllAssets
- GET request 
- Returns an array of JSONs. Each JSON has these keys - 'url' , 'likes' , 'downloads' , 'setLimasCost', '_id' (username to which the asset belongs to)

### /newAsset
- POST request
- Request body must have 'url'
- Optional fields: 'likes' , 'downloads' , 'setLimasCost'
- Adds a new asset to the logged in user
- Return
   - <p> Successfully Updated </p>
   - <p> Please Provide an Asset URL </p>

### /updateAsset
- POST request
- Request body must have 'url'
- Optional fields: 'likes' , 'downloads' , 'setLimasCost'. Please provide atleast one to update
- Return
   - <p> No such asset URL found </p>
   - <p> Successfully Updated </p>
   - <p> No valid key passed </p>

### /getUserTransactions
- GET request
- Returns a JSON array of 'url', 'action', 'limas'

### /newTransaction
- POST request
- Request body must have - 'url', 'action' - (either 'like' or 'download')
- Optional: 'limas' ( cost given by the user to download the asset)
- Return:
   - <p> Successfully Added </p>
   - <p> Please Provide an Asset URL used in transaction </p>
   - <p> Please provide an action of either like or download </p>
   - <p> Please provide an action of either like or download </p>

### /getUserRewards
- GET request
- Returns a JSON array of 'url', 'description', 'limas' (required to achieve this reward as set by their parents)

### /newReward
- POST request
- Request body must have - 'url', 'limas'
- Optional: 'description' ( Reward description)
- Return:
   - <p> Successfully Added </p>
   - <p> Please provide reward description and limas </p>

### /getAllCourses
- GET request
- Returns a JSON array of '_id', (course url),  'description', 'title', 'author', 'limas' (the lima amount a user would earn on watching this)

### /newCourse
- POST Request
- Required field - 'url'
- Optional: 'description', 'title', 'author', 'limas' 
- Return
   - <p> Please provide course url </p>
   - <p> Successfully Added </p>

### /newUserCourse
- POST Request
- Required field - 'url'
- Optional: 'progress' (should be a numeric value out of 100)
- Adds to the courses list belonging to the user
- Return
   - <p> Please provide course url </p>
   - <p> No such course exists. Enter valid course url </p>'   (Can only add a course to a user which has been created by /newCourse before - Obviously the user cannot add a course which was not put on the platform by us before)
   - <p> Successfully Added </p>

### /getUserCourses
- GET request
- Returns a JSON array of '_id', (course url),  'description', 'title', 'author', 'limas', 'progress' (the lima amount a user would earn on watching this)

## Database Schema - User data

It is a mongodb database
This is an example document (entry) which would explain the schema of the entire collection

{
   _id: 'SidTheKidz',
   password: 'SidTheKid', 
   firstName: 'Sid',
   lastName: 'Anand',
   email: 'abc@gmail.com',
   profile: 'www.xuxu.com',
   totalLikes: 5,
   totalDownloads: 4,
   totalLimas: 1000,
   assets: [{
      url: 'www.test1.com',
      likes: 1,
      downloads: 3,
      setLimasCost: 30     
   }, {
      url: 'www.test2.com',
      likes: 4,
      downloads: 1,
      setLimasCost: 300  
   }],
   transactions: [{
      url: 'www.test3.com',
      action: 'like',
      limas: 50
   }],
   rewards: [{
      limas: 100,
      description: 'Gift for you',
      url: 'www.gifts.com'
   }],
   courses: [{
      url: 'www.course.com',
      progress: 80
   }]
})

## Database Schema - Course data
{
   _id: 'www.course.com',
   usernames: ['Sid'],
   limas: 30,
   title: 'Something nice',
   description: 'Something nicer',
   author: 'Great'
}