import { Schema, model } from 'mongoose';

const ElderSchema = new Schema(
	{
		student_id: {
			type: String,
			required: true,
		},
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		nickname: {
			type: String,
			required: true,
		},
		code_id: {
			type: String,
		},
	},
	{ timestamps: false }
);

let Elder = model('elders', ElderSchema);

export default Elder;
