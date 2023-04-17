const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User.model")
const saltRounds = 10
const jwt = require("jsonwebtoken")
const { verifyToken } = require('../middlewares/VerifyToken')

router.post('/signup', (req, res, next) => {

    const { username, email, password } = req.body

    if (password.length < 4) {
        res.status(400).json({ errorMessages: ["La contraseña debe tener al menos 4 caracteres."] })
        return
    }
    User
        .findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.status(400).json({ errorMessages: ["El usuario ya existe."] })
                return
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hasedPassword = bcrypt.hashSync(password, salt)

            return User.create({ username, email, password: hasedPassword })
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body


    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ["Email y contraseña requeridos."] })
        return
    }

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.status(401).json({ errorMessages: ["Usuario no registrado."] })
                return
            }

            if (bcrypt.compareSync(password, user.password)) {

                const { _id, email, username, role } = user
                const payload = { _id, email, username, role, likes }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Datos de acceso incorrectos." })
            }

        })
        .catch(err => next(err))
})

router.get('/verify', verifyToken, (req, res, next) => {
    res.json(req.payload)
})


module.exports = router
