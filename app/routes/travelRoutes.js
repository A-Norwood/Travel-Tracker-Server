const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// require book model
const Travel = require('./../models/travel')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /travel
router.get('/travel', requireToken, (req, res, next) => {
  Travel.find({'owner': req.user.id})
    .then(travel => {
      return travel.map(travel => travel.toObject())
    })
    .then(travel => res.status(200).json({ travel: travel }))
    .catch(next)
})

// SHOW
// GET /travel/:id
router.get('/travel/:id', requireToken, (req, res, next) => {
  Travel.findById(req.params.id)
    .then(handle404)
    .then(travel => res.status(200).json({ travel: travel.toObject() }))
    .catch(next)
})

// CREATE
// POST /travel/
router.post('/travel', requireToken, (req, res, next) => {
  req.body.travel.owner = req.user.id
  Travel.create(req.body.travel)
    .then(travel => {
      res.status(201).json({ travel: travel.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /travel/:id
router.patch('/travel/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.travel.owner
  Travel.findById(req.params.id)
    .then(travel => {
      requireOwnership(req, travel)
      return travel.updateOne(req.body.travel)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
//
// DESTROY
// DELETE /travel/:id
router.delete('/travel/:id', requireToken, (req, res, next) => {
  Travel.findById(req.params.id)
    .then(handle404)
    .then(travel => {
      requireOwnership(req, travel)
      travel.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
