import express from 'express'
import getNumber from '../core/getNumber'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// nothing needed to do here, just getNumber to set a number.
router.post('/start', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  console.log("dd") //
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  console.log(number)
  if (guessed !== 0 && !guessed) {
    res.status(500).send({ msg: 'No number provided.' })
  }
  // TODO: checked if number and guessed are the same, response with some hint
  if (number === guessed) {
    res.send({msg : 'correct'})
  }
  else {
    if (number > guessed) {
      res.send({msg : 'bigger'})
    }
    else if (number < guessed) {
      res.send({msg : 'smaller'})
    }
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (req, res) => {
  const number = getNumber(true)
  const guessed = roughScale(req.query.number, 10)
  res.send('restart')
}) 
export default router
