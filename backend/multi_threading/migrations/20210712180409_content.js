exports.up = function (knex) {
	return knex.schema.createTable('UserProfile', (t) => {
		t.increments();
		t.string('first_name').notNullable();
		t.string('last_name').notNullable();
		t.string('department').nullable();
		t.string('title').nullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('UserProfile');
};
