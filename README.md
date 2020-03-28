# Welcome to Digital Assets Hub!

This is a gamification system that help kids to earn digital currencies for their creations

# Backend Docs

## Endpoints

### /signup
- POST with two request body parameters required - 'username' and 'password'
- Failure to provide them results in an error and send an error response
- Creates a new entry in the database with these default values - totalLikes = 0, totalDownloads = 0, totalLimas = 100 (every new user gets 100 limas)
- After signup make users login and returns a successfuly response

### /login
- GET request with two URL query parameters - 'username' and 'password'
- Failure to provide them results in an error and send an error response
- Sends an error message if password is wrong
- if successful, adds the username to current session and sends a success response

### /getUserAssets
- GET request 
- Returns the user assets ( the user is the one which is in session after login)
- Returns an array of JSONs. Each JSON has these keys - url , likes , downloads , setLimasCost

### /getUserDetails
- GET request 
- Returns the user assets ( the user is the one which is in session after login)
- Returns an array of JSONs. Each JSON has these keys - totalLikes, totalDownloads, totalLimas, _id (username)

### /getAllAssets
- GET request 
- Returns the user assets ( the user is the one which is in session after login)
- Returns an array of JSONs. Each JSON has these keys - url , likes , downloads , setLimasCost, _id (username to which the asset belongs to)

## Database Schema

It is a mongodb database
This is an example document (entry) which would explain the schema of the entire collection

{
   _id: 'Sid',
   Password: 'SidsPassword', 
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
   }]
}