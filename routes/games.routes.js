const router = require("express").Router();
const Game = require("../models/Game.model");


router.get('/getAllGames', (req, res, next) => {

  const { name, category, image, stars } = req.query

  Game
    .find()
    .sort({ name: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))

})

router.get('/getOneGame/:game_id', (req, res, next) => {

  const { game_id } = req.params

  Game
    .findById(game_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post('/createGame', (req, res, next) => {

  const { name, category, image, stars } = req.body

  Game
    .create({ name, category, image, stars })
    .then(response => res.json(response))
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.put('/updateGame/:game_id', (req, res, next) => {

  const { game_id } = req.params
  const { name, category, image } = req.body

  Game
    .findByIdAndUpdate(game_id, { name, category, image })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.delete('/deleteGame/:game_id', (req, res, next) => {

  const { game_id } = req.params

  Game
    .findByIdAndDelete(game_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


module.exports = router;
