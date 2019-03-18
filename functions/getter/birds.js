var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use( function timeLog (req, res, next)  {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/',  (req, res) => {
  res.send('CHUUUUUUUUUUUUPA RAFAEL AGR ERIC É MEEEU MLR AMG')
})
// define the about route
router.post('/',  (req, res) => {
  lyrics =  " Blackbird singing in the dead of night \n Take these broken wings and learn to fly \n All your life \n You were only waiting for this moment to ariseBlackbird singing in the dead of night \n Take these sunken eyes and learn to see \n All your life \n You were only waiting for this moment to be free \n Blackbird fly, blackbird fly \n Into the light of the dark black night \n Blackbird fly, blackbird fly \n Into the light of the dark black night \n Blackbird singing in the dead of night \n Take these broken wings and learn to fly \n All your life \n You were only waiting for this moment to arise \n You were only waiting for this moment to arise \n You were only waiting for this moment to arise \n" 

  res.send(lyrics)
})

module.exports = router
