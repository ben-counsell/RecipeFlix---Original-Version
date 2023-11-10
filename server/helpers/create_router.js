const express = require('express');
const ObjectID = require('mongodb').ObjectId;


const createRouter = function (collection) {

    const router = express.Router();
  
    router.get("/", (req, res) => {
      collection.find().toArray()
      .then((listOfUsers) => res.json(listOfUsers))
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({status:500, error: err})
      })
    })
    
    router.get('/:id', (req, res) => {
      const id = req.params.id;
      collection
        .findOne({ _id: new ObjectID(id) })
        .then((doc) => res.json(doc))
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
    })

    router.put('/favourite/:userId/:recipeId', (req, res) => {
      const userToUpdate = { _id: new ObjectID(req.params.userId) }
      const newFavourite = { $push: {favourites:req.params.recipeId}}
      collection
        .updateOne(userToUpdate, newFavourite)
        .then(res.json({status:200}))
        .catch((err) => {
          console.error(err)
          res.status(500)
          res.json({ status: 500, error: err })
        })
    })

    router.delete('/favourite/:userId/:recipeId', (req, res) => {
      const userToUpdate = { _id: new ObjectID(req.params.userId)}
      const favouriteToDelete = { $pull: {favourites:req.params.recipeId}}
      collection
      .updateOne(userToUpdate, favouriteToDelete)
      .then(res.json({status:200}))
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({ status: 500, error: err })
      })
    })

    router.put('/diet/:userId/:diet', (req, res) => {
      const userToUpdate = { _id: new ObjectID(req.params.userId) }
      const newDiet = { $push: {dietary_preference:req.params.diet} }
      collection
      .updateOne(userToUpdate, newDiet)
      .then(res.json({status:200}))
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({ status: 500, error: err })
      })
    })

    router.put('/intolerance/:userId/:intolerance', (req, res) => {
      const userToUpdate = { _id: new ObjectID(req.params.userId) }
      const newIntolerance = { $push: {intolerances:req.params.intolerance} }
      collection
      .updateOne(userToUpdate, newIntolerance)
      .then(res.json({status:200}))
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({ status: 500, error: err })
      })
    })

    router.delete('/intolerance/:userId/:diet', (req, res) => {
      const userToUpdate = { _id: new ObjectID(req.params.userId) }
      const dietToDelete = { $pull: {dietary_preference:req.params.diet} }
      collection
      .updateOne(userToUpdate, dietToDelete)
      .then(res.json({status:200}))
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({ status: 500, error: err })
      })
    })

    router.delete('/intolerance/:userId/:intolerance', (req, res) => {
      const userToUpdate = { _id: new ObjectID(req.params.userId) }
      const intoleranceToDelete = { $pull: {intolerances:req.params.intolerance} }
      collection
      .updateOne(userToUpdate, intoleranceToDelete)
      .then(res.json({status:200}))
      .catch((err) => {
        console.error(err)
        res.status(500)
        res.json({ status: 500, error: err })
      })
    })

    return router
}

module.exports = createRouter;