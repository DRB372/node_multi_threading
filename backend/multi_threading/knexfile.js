module.exports = {
	development: {
		client: 'pg',
		connection:
			'postgres://' +
			process.env.POSTGRES_USERNAME +
			':' +
			process.env.POSTGRES_PASSWORD +
			'@' +
			process.env.POSTGRES_HOST +
			'/' +
			process.env.POSTGRES_DATABASE,
		migrations: {
			directory: './migrations',
		},
	},

	staging: {
		client: 'postgresql',
		connection:
			'postgres://' +
			process.env.POSTGRES_USERNAME +
			':' +
			process.env.POSTGRES_PASSWORD +
			'@' +
			process.env.POSTGRES_HOST +
			'/' +
			process.env.POSTGRES_DATABASE,
		migrations: {
			directory: './migrations',
		},
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
