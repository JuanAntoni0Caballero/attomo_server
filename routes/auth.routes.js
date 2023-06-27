const router = require("express").Router();
const User = require("../models/User.model");


router.get("/", (req, res, next) => {
    res.json("Ruta de usuario");
});


router.post('/signup', (req, res, next) => {
    User
        .create({ username, email, password })
        .then(() => res.sendStatus(201))
        .catch(err => next(err));

})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body;


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

            if (user.validatePassword(password)) {
                res.status(200).json
            } else {
                res.status(401).json({ errorMessages: ['Contraseña incorrecta.'] })
            }
        })
        .catch(err => next(err));
})




module.exports = router
