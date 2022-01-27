const Poke = require('./pokemin-model')
const db = require('../../data/db-config')

test('NODE_ENV is correct', () => {
	expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () => {
	await db.migrate.rollback()
	await db.migrate.latest()
})
beforeEach(async () => {
	await db.seed.run()
})
afterAll(async () => {
	await db.destroy()
})

describe('Pokemin model', () => {

	describe('Poke.get()', () => {
		let abilites
		beforeEach(async () => {
			abilites = await Poke.get()
		})
		test('returns all abilites', () => {
			expect(abilites).toHaveLength(4)
		})
		test('returned abilities have id, ability_name, description, and pokemon', () => {
			expect(abilites[0]).toMatchObject({
				ability_name: 'Adaptability',
				description: 'Adaptability increases the effectiveness of STAB moves from the usual 1.5× to 2×.',
				pokemon: [
					'Eevee',
					'Porygon-Z',
					'Basculin',
					'Basculegion',
				],
			})
		})
	})
})