const router = require("express").Router()

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const gamesRoutes = require("./games.routes")
router.use("/games", gamesRoutes)




module.exports = router