const express = require("express");
const router = express.Router();
const db = require("../models");

//get all chats
router.get("/", (req, res) => {
  db.Chat.find({})
    .then((allChats) => {
      res.json(allChats);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

// //get all chats by map id
// router.get("/:mapid", (req,res)=>{
//   db.Chat.findAll({
//     where: {
//       MapId: req.params.map
//     },
//     include: [db.User]
//   }).then(allMapChats=>{
//     res.json(allMapChats)
//     res.status(204).end()
//   }).catch(err=>{
//     console.log(err)
//     res.status(500).end()
//   })
// })

//add a new 
router.post("/new", (req,res)=>{
  db.Chat.create({
    author: req.body.author,
    map: req.body.map,
    message: req.body.message
  }).then(newChat=>{
    res.json(newChat)
    res.status(204).end()
  }).catch(err=>{
    console.log(err)
    res.status(500).end()
  })
})

//delete chat


module.exports = router;
