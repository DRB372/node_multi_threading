const UserProfile = require('../models/UserProfile');
const retry = require('async-retry');

const getUser = async (id) => {
	try {
		const data = await UserProfile.query()
			.findOne({ id: id })
			.throwIfNotFound();
		return { result: { status: 200, message: 'User Found', data: data } };
	} catch (error) {
		return { error: { status: 404, message: 'User not found', data: null } };
	}
};
const createUser = async (body) => {
	try {
		const data = await UserProfile.query().insert(body);
		return { result: { status: 201, data: data } };
	} catch (error) {
		return { error: { status: 404 } };
	}
};

const updateUser = async (id, body) => {
	try {
		// Packages
		await retry(
			async () => {
				await UserProfile.transaction(async (trx) => {
					await trx.raw('SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');

					const jennifer = await UserProfile.query(trx)
						.patch(body)
						.where({ id: id });

					return {
						result: {
							status: 200,
							message: 'User Updated',
							data: Date.now(),
							user: jennifer,
						},
					};
				});
			},
			{
				retries: 1,
			},
		);

		// const data = await UserProfile.query()
		// 	.patch(body)
		// 	.where()
		// 	.throwIfNotFound();
		// return {
		// 	result: { status: 200, message: 'User Updated', data: Date.now() },
		// };
	} catch (error) {
		return { error: { status: 400, message: error.message, data: null } };
	}
};

module.exports = {
	getUser,
	createUser,
	updateUser,
};
