const db = require('../../data/db-config')

function get() {
	return db('abilities')
}

function getById(id) {
	return db('abilities')
	.where('ability_id', id)
	.first()
}

async function insert(ability) {
	const [id] = await db('abilities')
		.insert(ability)
	return getById(id)
}

module.exports = {
	get,
	getById,
	insert,
}
