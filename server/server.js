import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import { success, error } from 'consola';
import { db_connection } from './config';

const app = express();
const PORT = process.env.SERVER_PORT || 8861;

var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(morgan('dev'));

import passport_init from './middleware/passport';
import authRoute from './routes/auth.route';
passport_init(passport);
app.use('/api/auth', authRoute);

const startDatabase = async () => {
	try {
		await mongoose.connect(db_connection, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			dbName: 'codeline',
		});

		success({
			message: `Successfully connected with the database on ${db_connection}`,
			badge: true,
		});
	} catch (err) {
		error({
			message: `Unable to connected with the database ${err}`,
			badge: true,
		});
		setTimeout(startDatabase, 5000);
	}
};

startDatabase();

app.listen(PORT, () => {
	success({ message: `Server started on PORT ${PORT}`, badge: true });
});


