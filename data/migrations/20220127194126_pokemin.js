/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('abilities', table => {
		table.increments('ability_id');
		table.string('ability_name', 126).unique().notNullable();
		table.string('description').notNullable()
		table.specificType('pokemon', 'text ARRAY').notNullable()
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTableIfExists('abilities')
};
