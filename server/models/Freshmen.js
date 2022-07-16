import { Schema, model } from 'mongoose';

const FreshmenSchema = new Schema(
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
		ig: {
			type: String,
		},
		facebook: {
			type: String,
		},
		favorite_food: {
			type: String,
		},
		wording: {
			type: String,
		},
		hint1: {
			type: String,
		},
		hint2: {
			type: String,
		},
		hint3: {
			type: String,
		},
		hint4: {
			type: String,
		},
	},
	{ timestamps: false }
);

let Freshmen = model('freshmens', FreshmenSchema);

export default Freshmen;
