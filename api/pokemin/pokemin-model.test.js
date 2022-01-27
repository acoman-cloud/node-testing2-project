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
				pokemon: 'Eevee,Porygon-Z,Basculin,Basculegion'
			})
		})
	})

	describe('Poke.getById(id)', () => {
		let adaptability, blaze
		beforeEach(async () => {
			adaptability = await Poke.getById(1)
			blaze = await Poke.getById(4)
		})
		test('returns the correct ability', () => {
			expect(adaptability).toMatchObject({
				ability_id: 1,
				ability_name: 'Adaptability',
				description: 'Adaptability increases the effectiveness of STAB moves from the usual 1.5× to 2×.',
				pokemon: 'Eevee,Porygon-Z,Basculin,Basculegion'
			})
			expect(blaze).toMatchObject({
				ability_id: 4,
				ability_name: 'Blaze',
				description: 'blaze bro',
				pokemon: 'Charmander,Charmeleon,Charizard,Cyndaquil,Quilava,Typhlosion,Torchic,Combusken,Blaziken,Chimchar,Monferno,Infernape,Tepig,Pignite,Emboar,Fennekin,Braixen,Delphox,Litten,Torracat,Incineroar,Scorbunny,Raboot,Cinderace'
			})
		})
	})

	describe('Poke.insert(ability)', () => {
		let intimidate = {
			ability_name: 'Intimidate',
			description: "Intimidate lower's the Attack of all opponents by one stage when the ability-bearer switches in (including the start of a battle).",
			pokemon: ['ekans', 'Gyarados']
		}
		let result
		beforeEach(async () => {
			result = await Poke.insert(intimidate)
		})

		test('db updates with the new ability', async () => {
			const newThang = await db('abilities').where('ability_id', 5).first()
			expect(newThang).toMatchObject({
				ability_id: 5,
				ability_name: 'Intimidate',
				description: "Intimidate lower's the Attack of all opponents by one stage when the ability-bearer switches in (including the start of a battle).",
				pokemon: 'ekans,Gyarados',
			})
		})
		test('resolves the newly created ability', async () => {
			expect(result).toMatchObject({
				ability_id: 5,
				ability_name: 'Intimidate',
				description: "Intimidate lower's the Attack of all opponents by one stage when the ability-bearer switches in (including the start of a battle).",
				pokemon: 'ekans,Gyarados',
			})
		})
	})
})