exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('abilities')
    .truncate()
    .then(function() {
      return knex('abilities').insert([
        { 
					ability_name: 'Adaptability',
					description: 'Adaptability increases the effectiveness of STAB moves from the usual 1.5× to 2×.', 
					pokemon:[
						'Eevee',
						'Porygon-Z',
						'Basculin',
						'Basculegion',
					],
				},
        { 
					ability_name: 'Arena Trap',
					description: 'Prevents the foe from fleeing.', 
					pokemon:[
						'Diglett',
						'Dugtrio',
						'Trapinch',
					]
				},
				{ 
					ability_name: 'Air Lock',
					description: 'Air Lock suppresses all effects brought on by weather, including move power increases, end-of-turn damage, accuracy changes, relevant abilities and so on.', 
					pokemon:[
						'Rayquaza',
					]
				},
				{ 
					ability_name: 'Blaze',
					description: "Blaze increases the power of Fire-type moves by 50% (1.5×) when the ability-bearer's HP falls below a third of its maximum (known in-game as in a pinch).", 
					pokemon:[
						'Charmander',
						'Charmeleon',
						'Charizard',
						'Cyndaquil',
						'Quilava',
						'Typhlosion',
						'Torchic',
						'Combusken',
						'Blaziken',
						'Chimchar',
						'Monferno',
						'Infernape',
						'Tepig',
						'Pignite',
						'Emboar',
						'Fennekin',
						'Braixen',
						'Delphox',
						'Litten',
						'Torracat',
						'Incineroar',
						'Scorbunny',
						'Raboot',
						'Cinderace',
					]
				},
      ]);
    });
};
