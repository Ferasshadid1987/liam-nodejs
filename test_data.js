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

db.Test.insert({
   _id: 'AhmedTikiwa',
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
      setLimasCost: 30,
      name: "Test1 Asset"     
   }, {
      url: 'www.test2.com',
      likes: 4,
      downloads: 1,
      setLimasCost: 300,
      name: "Test 2 Asset"  
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




db.Courses.insert({
   _id: 'www.course.com',
   usernames: ['SidTheKid'],
   limas: 30,
   title: 'Something nice',
   description: 'Something nicer',
   author: 'Great',
   image: 'www.thumbnail.com'
})