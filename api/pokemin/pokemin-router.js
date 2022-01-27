const router = require("express").Router()
const Poke = require('./pokemin-model.js')

router.get('/', (req, res, next) => {
	Poke.get()
		.then(ab => {
			res.status(200).json(ab)
		})
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	Poke.getById(req.params.id)
		.then(ab => {
			res.status(200).json(ab)
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	Poke.insert(req.body)
		.then(created=>{
			res.status(200).json(created)
		})
		.catch(next)
})

module.exports = router