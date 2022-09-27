const { isMainThread, parentPort } = require('worker_threads');

const workerConfig = async (id) => {
	if (!isMainThread) {
		parentPort.on('message', (data) => {
			// 'data' contains the payload sent by main thread
			const parsedJSON = JSON.parse(data);

			// Send data back to main thread
			parentPort.postMessage(parsedJSON);
		});
	}
};

module.exports = {
	workerConfig,
};
