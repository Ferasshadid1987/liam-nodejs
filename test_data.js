// To connect from Mongo Shell: mongo "mongodb+srv://cluster0-xelv3.mongodb.net/test"  --username DbAdmin
db.Test.insert({
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
   transactions: [],
   rewards: []
})