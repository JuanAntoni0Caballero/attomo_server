const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json("Ruta de usuario");
});

module.exports = router;
