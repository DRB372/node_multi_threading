const express = require('express');

const dbConfig = require('./database/DatabaseConfig');
const app = express();

const PORT = process.env.multi_threading_PORT || 3030;
const UserProfileRoute = require('./routes/UserProfileRoute');

dbConfig.initializeDB();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/v1/user_profile', UserProfileRoute);

app.listen(PORT, () => {
	console.log('Server Started on ' + PORT);
});
