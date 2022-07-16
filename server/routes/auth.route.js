import axios from 'axios';
import express from 'express';
import Elder from '../models/Elder';
import Freshmen from '../models/Freshmen';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
const router = express.Router();

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: 'empty value' });
	}

	const postData = {
		UserName: username,
		PassWord: password,
	};

	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Application-Key':
				'TUdc61909316c38d2b2e9581a2600a77cbdd32cb8fbebff52628c5c7aa5cc8bf94e6b40771d2b75416b6c35373fdf6386d',
		},
	};

	try {
		const response = await axios.post(
			'https://restapi.tu.ac.th/api/v1/auth/Ad/verify',
			postData,
			config
		);

		var data = await Elder.findOne({ student_id: username }).lean();
		var role = 'elder';
		if (!data) {
			data = await Freshmen.findOne({ student_id: username }).lean();
			role = 'freshmen';
			if (!data) {
				return res.status(400).json({ message: 'ไม่พบข้อมูลสายรหัสของท่าน'});
			}
		}
		console.log(data)

		if(role === 'elder') {
			const code_id_list = data.code_id.split(";");
			var codeline = await Promise.all(code_id_list.map(async (code_id) => {
				const codeline_data = await Freshmen.findOne({ code_id }).lean();
				return {
					codeline_student_id: codeline_data.student_id,
					codeline_firstname: codeline_data.firstname,
					codeline_lastname: codeline_data.lastname,
					codeline_nickname: codeline_data.nickname,
					codeline_favorite_food: codeline_data.favorite_food,
					codeline_ig: codeline_data.ig,
					codeline_facebook: codeline_data.facebook,
					codeline_wording: codeline_data.wording,
				}
			}))
			
		}

		const sign_data = role === 'freshmen'? {
			student_id: data.student_id,
			firstname: data.firstname,
			lastname: data.lastname,
			nickname: data.nickname,
			role,
			hint1: data.hint1,
			hint2: data.hint2,
			hint3: data.hint3,
			hint4: data.hint4,
		}:
		{
			student_id: data.student_id,
			firstname: data.firstname,
			lastname: data.lastname,
			nickname: data.nickname,
			role,
			codeline,
		}

		let token = jwt.sign(
			sign_data,
			secret,
			{ expiresIn: '6h' }
		);

		let result = {
			token: `Bearer ${token}`,
			expiresIn: 500,
		};

		return res
			.status(201)
			.send({ ...data, message: response.data.message, ...result, role });
	} catch (error) {
		if (error.response) {
			return res.status(error.response.status).json(error.response.data);
		}
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
});

router.post('/add-elder', async (req, res) => {
	const { code_id, student_id, firstname, lastname, nickname } = req.body;
	try {
		await Elder.create({
			code_id,
			student_id,
			firstname,
			lastname,
			nickname,
		});

		return res.status(201).json('success');
	} catch (error) {
		return res.status(500).json('Nothing');
	}
});

router.get('/check-info-butfornongpoomkondeaw:student_id', async (req, res) => {
	const { student_id } = req.params;
	try {
		var data = await Elder.findOne({ student_id: username }).lean();
		var role = 'elder';
		if (!data) {
			data = await Freshmen.findOne({ student_id: username }).lean();
			role = 'freshmen';
			if (!data) {
				return res.status(400).json({ message: 'ไม่พบข้อมูลสายรหัสของท่าน'});
			}
		}

		if(role === 'elder') {
			const code_id_list = data.code_id.split(";");
			var codeline = await Promise.all(code_id_list.map(async (code_id) => {
				const codeline_data = await Freshmen.findOne({ code_id }).lean();
				return {
					codeline_student_id: codeline_data.student_id,
					codeline_firstname: codeline_data.firstname,
					codeline_lastname: codeline_data.lastname,
					codeline_nickname: codeline_data.nickname,
					codeline_favorite_food: codeline_data.favorite_food,
					codeline_ig: codeline_data.ig,
					codeline_facebook: codeline_data.facebook,
					codeline_wording: codeline_data.wording,
				}
			}))
			
		}

		const sign_data = role === 'freshmen'? {
			student_id: data.student_id,
			firstname: data.firstname,
			lastname: data.lastname,
			nickname: data.nickname,
			role,
			hint1: data.hint1,
			hint2: data.hint2,
			hint3: data.hint3,
			hint4: data.hint4,
		}:
		{
			student_id: data.student_id,
			firstname: data.firstname,
			lastname: data.lastname,
			nickname: data.nickname,
			role,
			codeline,
		}

		return res.status(200).json(sign_data);
	} catch (error) {
		return res.status(500).json('Nothing');
	}
});

export default router;
