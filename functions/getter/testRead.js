const express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next)  {
    console.log('Time: ', Date.now())
    next()
})

//Define the home page route.
module.exports = router.post("/", ((req, res) => {
    var result;
    if (req.query.funcRead === undefined) {
        result = req.body;
    } else {
        result = req.query;
    }
    res.send(result.funcRead)

}))