const router = require("express").Router();
const Game = require("../models/Game.model");
const User = require("../models/User.model");


router.get('/getAllGames', (req, res, next) => {

  // const { name, category, image, stars } = req.query
  Game
    .find()
    .sort()
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

  const { name, category, description, image, stars } = req.body

  Game
    .create({ name, category, description, image, stars })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.put('/updateGame/:game_id', (req, res, next) => {

  const { game_id } = req.params
  const { name, category, description, image } = req.body

  Game
    .findByIdAndUpdate(game_id, { name, category, description, image })
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

// router.put('/diLike/:game_id/:user_id', (req, res, next) => {

//   const { game_id, user_id } = req.params

//   Game
//     .findByIdAndUpdate(game_id, { $inc: { likes: -1 }, $pull: { likedBy: user_id } })
//     .then(response => res.json(response))
//     .catch(err => next(err))
// })


router.post('/likeGame/:game_id/:user_id', async (req, res, next) => {

  try {

    const { game_id, user_id } = req.params;

    const user = await User.findById(user_id);
    const game = await Game.findById(game_id);

    console.log('EL ID DEL GAME ==> ', game_id)
    console.log('EL ID DEL USER ==> ', user_id)

    if (!user || !game) {
      return res.status(400).json({ message: 'El usuario o el juego no existen' })

    }


    if (user.likes.length >= 5) {
      return res.status(400).json({ message: 'Ya has alganzado el máximo de likes' })
    }

    const likedGame = user.likes.find(like => like.game.toString() === game_id)

    if (likedGame) {
      return res.status(400).json({ message: 'Ya has dado like a este juego' })
    }

    user.likes.push({ game: game_id })
    game.likesBy.push({ user: user_id })

    await user.save()
    await game.save()

    res.status(200).json({ message: 'Like agregado' })

  } catch (error) {
    next(error)
  }
})



module.exports = router;
