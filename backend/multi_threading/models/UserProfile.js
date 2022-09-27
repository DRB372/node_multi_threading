const { Model } = require('objection');
const path = require('path');
class UserProfile extends Model {
	static get tableName() {
		return 'UserProfile';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['first_name', 'last_name'],
			properties: {
				first_name: { type: 'string' },
				last_name: { type: 'string' },
				title: { type: 'string' },
				department: { type: 'string' },
			},
		};
	}
}

module.exports = UserProfile;
