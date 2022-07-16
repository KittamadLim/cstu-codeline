import Admin from '../models/Admin';
import bcrpyt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { secret } from '../config';

/**
 * @description To register the user (ADMIN, USER)
 */

const userRegister = async (userDets, role, res) => {
	try {
		// Validate the user
		let usernameNotTaken = await validateUsername(userDets.username);
		if (!usernameNotTaken) {
			return res.status(400).json({
				message: 'Username is already taken.',
				success: false,
			});
		}

		// Get the hashed password
		const password = await bcrpyt.hash(userDets.password, 12);

		const newUser = new Admin({
			...userDets,
			password,
			role,
		});

		await newUser.save();
		return res.status(201).json({
			message: 'เพิ่มรายการเสร็จสิ้น',
			success: true,
		});
	} catch (error) {
		// Implement logger function (winston)
		return res.status(500).json({
			message: 'ไม่สามารถเพิ่มรายการข้อมูลได้.',
			success: false,
		});
	}
};

/**
 * @description To login the user (ADMIN, USER)
 */

const userLogin = async (userCreds, role, req, res) => {
	let { username, password } = userCreds;
	// First Check if the username is in the database
	const user = await Admin.findOne({ username });
	if (!user) {
		return res.status(404).json({
			message: 'Username is not found. Invalid login credentials.',
			success: false,
		});
	}

	// * edit * no need to check
	// We will check the role
	// if (user.role !== role) {
	// 	return res.status(403).json({
	// 		message: 'Please make sure you are loggin in from the right portal.',
	// 		success: false,
	// 	});
	// }

	// That means user is existing and trying to signin from the right protal
	// Now check for the password
	let isMatch = await bcrpyt.compare(password, user.password);
	if (isMatch) {
		// Sign in the token and issue it to the user
		let token = jwt.sign(
			{
				user_id: user._id,
				username: user.username,
				firstname: user.firstname,
				lastname: user.lastname,
				role: user.role,
			},
			secret,
			{ expiresIn: '6h' }
		);

		let result = {
			role: user.role,
			token: `Bearer ${token}`,
			expiresIn: 500,
		};

		return res.status(200).json({
			...result,
			message: 'Congratulation! You are now logged in.',
			success: true,
		});
	} else {
		return res.status(403).json({
			message: 'Incorrect Username or password.',
			success: false,
		});
	}
};

/**
 * @description Oassport middleware
 */
const userAuth = passport.authenticate('jwt', { session: false });

/**
 * @description Oassport middleware
 */
const checkRole = (roles) => (req, res, next) => {
	roles.includes(req.user.role)
		? next()
		: res
				.status(401)
				.json({ message: 'You are not allowed to use this request' });
};

const userLogout = async (req, res) => {
	res.cookie('jwt', 'loggedout', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).send('user is logged out');
};

const validateUsername = async (username) => {
	let user = await Admin.findOne({ username });
	return user ? false : true;
};

const serializeUser = (user) => {
	return {
		username: user.username,
		_id: user._id,
		updateAt: user.updateAt,
		createAt: user.createAt,
	};
};

export {
	checkRole,
	userRegister,
	userLogin,
	userLogout,
	userAuth,
	serializeUser,
};
