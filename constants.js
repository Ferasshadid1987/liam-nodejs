require('dotenv').config()

module.exports = {
	dbName : "Covid_Breakers",
	collectionName : "Test",
	courseCollectionName: 'Courses',
	port: process.env.PORT || 3000,
	key: 'Secret'
}
console.log(process.env.PORT)

