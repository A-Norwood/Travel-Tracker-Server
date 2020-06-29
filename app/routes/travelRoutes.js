const express = require('express')
const router = express.Router()

// require book model
const Travel = require('./../models/travel')
const handle404 = require('./../../lib/custom_errors')

// INDEX
// GET /travel
router.get('/travel', (req, res, next) => {
  Travel.find()
    .then(travel => res.json({ travel: travel }))
    .catch(next)
})

// SHOW
// GET /travel/:id
router.get('/travel/:id', (req, res, next) => {
  const id = req.params.id
  Travel.findById(id)
    .then(handle404)
    .then(travel => res.json({travel: travel}))
    .catch(next)
})

// CREATE
// POST /travel/
router.post('/travel', (req, res, next) => {
  const travelData = req.body.travel

  console.log('what is travelData ', travelData)

  Travel.create(travelData)
    .then(travel => {
      console.log('what is travel ', travel)

      res.status(201).json({travel: travel})
    })
    .catch(next)
})

// UPDATE
// PATCH /travel/:id
// router.patch('/travel/:id', (req, res, next) => {
//   const id = req.params.id
//   const travelData = req.body.travel
//   Travel.findById(id)
//     .then(handle404)
//     .then(travel => travel.update(travelData))
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
//
// DESTROY
// DELETE /travel/:id
// router.delete('/travel/:id', (req, res, next) => {
//   const id = req.params.id
//   Travel.findById(id)
//     .then(handle404)
//     .then(travel => travel.remove())
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

module.exports = router
