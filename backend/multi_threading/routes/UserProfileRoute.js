const router = require('express').Router();
const { Worker, isMainThread } = require('worker_threads');
const UserProfile = require('../models/UserProfile');
const UserProfileController = require('../controllers/UserProfile.Controller');

let worker;
if (isMainThread) {
	worker = new Worker(__dirname + '/worker.js');

	worker.on('message', async (data) => {
		// const body = {
		// 	first_name: 'Test',
		// 	last_name: 'User',
		// 	title: 'Engineer',
		// 	department: 'software',
		// };
		// const userData = await UserProfileController.createUser(body);

		const userData = await UserProfileController.updateUser(22, data);
		console.log(userData);

		// 'data' contains the parsed JSON sent by worker thread
		// Do something with data
	});

	worker.on('error', (error) => {
		// Logging error caused by worker thread
		console.log(error.message);
	});

	worker.on('exit', (code) => {
		// console.log(code);
		if (code !== 0) throw new Error(`Worker stopped with exit code ${code}`);
		else console.log('Worker stopped ' + code);
	});
}

router.get('/', async (req, res) => {
	worker.postMessage({
		first_name: 'Hello 1',
	});
	worker.postMessage({
		first_name: 'Hello 2',
	});
	worker.postMessage({
		first_name: 'Hello 3',
	});
	worker.postMessage({
		first_name: 'Hello 4',
	});
	worker.postMessage({
		first_name: 'Hello 5',
	});

	res.send('We are processing your file.');
});

module.exports = router;
