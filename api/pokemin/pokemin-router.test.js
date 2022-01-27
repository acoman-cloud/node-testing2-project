const request = require('supertest')
const server = require('../server')
const db = require('../../data/db-config')

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

describe('GET /api/pokemon/abilites', () => {
	test('returns a status 200 OK', async () => {
		const res = await request(server)
			.get('/api/pokemon/abilites')
		expect(res.status).toBe(200)
	})
})

describe('GET /api/pokemon/abilites/:id', () => {
	test('returns a status 200 OK', async () => {
		const res = await request(server)
			.get('/api/pokemon/abilites/1')
		expect(res.status).toBe(200)
	})
})

describe('POST /api/pokemon/abilites', () => {
	test('returns a status 200 OK', async () => {
		const res = await request(server)
			.post('/api/pokemon/abilites')
			.send({
				ability_name: 'Intimidate',
				description: "Intimidate lower's the Attack of all opponents by one stage when the ability-bearer switches in (including the start of a battle).",
				pokemon: ['ekans', 'Gyarados']
			})
		expect(res.status).toBe(201)
	})
	test('returns the new ability', async () => {
		const res = await request(server)
			.post('/api/pokemon/abilites')
			.send({
				ability_name: 'Intimidate',
				description: "Intimidate lower's the Attack of all opponents by one stage when the ability-bearer switches in (including the start of a battle).",
				pokemon: ['ekans', 'Gyarados']
			})
		expect(res.body).toMatchObject({
			ability_id: 5,
			ability_name: 'Intimidate',
			description: "Intimidate lower's the Attack of all opponents by one stage when the ability-bearer switches in (including the start of a battle).",
			pokemon: 'ekans,Gyarados'
		})
		expect(res.body).not.toBe(null)
		expect(res.body).not.toBe(undefined)
	})
})