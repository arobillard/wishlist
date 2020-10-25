const users = [
  {
    "email": "hello@adamrobillard.ca",
    "fName": "Adam",
    "lName": "Robillard",
    "password": "pass123",
  }
]

const addList = [
  {
    "_id": "5f938212a0fe2660e43f419d",
    "name": "Christmas 2020",
    "desc": "Christmas list with the fam!"
  }
]

const addItem = [
  {
    "itemId": "5f94a664413ab183d36e3d68",
    "userId": "5f938212a0fe2660e43f419d",
    "name": "Sweatshirts",
    "desc": "I need a bunch of new basic Sweatshirts. Fun colours encouraged.",
    "imgs": "https://mms-images-prod.imgix.net/mms/images/catalog/3a52bc974e22dab11435fb6241b11ce7/styles/175800/catalog_detail_image_large.jpg?ixlib=rails-2.1.4&w=700&h=700&fit=fill&bg=ffffff&dpr=1&q=60&fm=pjpg&auto=compress&trim=auto&trimmd=0",
    "price": 1499,
    "desireRank": 7,
    "exactness": false,
    "listRef": ["5f945de9f3114572895ba54a"],
    "status": "unclaimed"
  },
  {
    "itemId": "5f9446522d51b771aa14e779",
    "userId": "5f938212a0fe2660e43f419d",
    "name": "PS5",
    "desc": "A sweet tasty new PS5",
    "url": "https://www.playstation.com/en-ca/ps5/",
    "imgs": "https://cdn.pocket-lint.com/r/s/1200x/assets/images/143354-games-feature-sony-playstation-5-release-date-rumours-and-everything-you-need-to-know-about-ps5-image1-cvz3adase9.jpg",
    "price": 62999,
    "desireRank": 10,
    "exactness": true,
    "listRef": ["5f945de9f3114572895ba54a"]
  },
  {
    "itemId": "5f9446862d51b771aa14e77b",
    "userId": "5f938212a0fe2660e43f419d",
    "name": "Spider-Man: Miles Morales",
    "desc": "A dope Spider-Man game.",
    "url": "https://www.playstation.com/en-ca/games/marvels-spider-man-miles-morales/",
    "imgs": "https://cdn.mos.cms.futurecdn.net/UEMCvCDwC5J4acmSoLNLBY.jpg",
    "price": 7999,
    "desireRank": 7,
    "exactness": true,
    "listRef": ["5f945de9f3114572895ba54a"]
  },
  {
    "userId": "5f938212a0fe2660e43f419d",
    "name": "Honkus Ponkus",
    "desc": "The honkiest ponkiest shirt.",
    "url": "https://www.reddit.com/r/untitledgoosegame/comments/dc5f8e/honkus_ponkus/",
    "imgs": "https://preview.redd.it/3svww2uk32q31.jpg?width=960&crop=smart&auto=webp&s=834f0fe4330ec02d0e96c62248c13e57d278a49b",
    "price": 1999,
    "desireRank": 10,
    "exactness": true,
    "listRef": ["5f945faae5e65d7424549112"]
  }
]

const deleteItem = [
  {
    "userId": "5f938212a0fe2660e43f419d",
    "itemId": "5f9437ae9a302d6cd9448a4d",
    "name": "PS5"
  }
]

