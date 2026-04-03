import mongoose, { Schema, Document } from "mongoose";

export interface Streak extends Document {
	date: Date[];
	longest_streak: number
}

const StreakSchema: Schema<Streak> = new Schema({
	date: {
		type: [{ type: Date }],
		required: true
	},
	longest_streak: {
		type: Number,
		required: true
	}
})

export interface SocialMedia extends Document {
	portfolio: string;
	linkedin: string;
	github: string;
	other: string
}

const SocialMediaSchema: Schema<SocialMedia> = new Schema({
	portfolio: {
		type: String,
	},
	linkedin: {
		type: String,
	},
	github: {
		type: String,
	},
	other: {
		type: String,
	}
})

export interface Verified extends Document {
	expiry_date: Date,
	isVerified: boolean
}

const VerifiedSchema: Schema<Verified> = new Schema({
	expiry_date: {
		type: Date,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false
	}
});

export interface Address extends Document {
	country: string;
	city: string
}

const AddressSchema: Schema<Address> = new Schema({
	country: {
		type: String,
	},
	city: {
		type: String,
	}
})

export interface History extends Document {
	problemID: number;
	problem_title: string;
	status: boolean;
	memory: number;
	language: string;
	code: string;
	datetime: Date;
}

const HistorySchema: Schema<History> = new Schema({
	problemID: {
		type: Number,
		required: true
	},
	problem_title: {
		type: String,
		required: true
	},
	status: {
		type: Boolean,
		required: true,
	},
	memory: {
		type: Number,
		required: true,
		default: 0
	},
	language: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true
	},
	datetime: {
		type: Date,
		required: true,
		default: Date.now
	}
});

export interface Miscellaneous {
	companyName: string,
	user_language: string,
	college: string
	//company, university, your_language, location emna, country ma dropdown
}

const MiscellaneousSchema: Schema<Miscellaneous> = new Schema({
	companyName: {
		type: String,
		default: 'Not Specified',
		required: false
	},
	user_language: {
		type: String,
		default: 'English',
		required: false
	},
	college: {
		type: String,
		default: '',
	}
});
export interface User extends Document {
	firstname: string;
	lastname: string;
	username: string;
	password: string;
	dob: Date;
	mobile_number: number;
	email: string;
	image: string;
	isOnline: boolean;
	description: string;
	registered_date: Date;
	streak: Streak;
	friends: string[];
	social_media: SocialMedia;
	address: Address;
	verified: Verified;
	languages: string[];
	solvedQuestion: mongoose.Schema.Types.ObjectId[];
	notifications: boolean;
	history: History[];
	miscellaneous: Miscellaneous;
	verifyToken: string;
	verifyTokenExpiry: Date;
	token: string;
}

const UserSchema: Schema<User> = new Schema({
	firstname:
	{
		type: String,
		required: true
	},
	lastname:
	{
		type: String,
		required: true
	},
	username:
	{
		type: String,
		required: true,
		unique: true
	},
	password:
	{
		type: String,
		required: true
	},
	dob:
	{
		type: Date,
	},
	mobile_number:
	{
		type: Number,
		required: false
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: false,
		default: "undefined"
	},
	isOnline: {
		type: Boolean,
		required: false,
		default: false
	},
	description: {
		type: String,
		required: false,
		default: "I'm using DevEchelons to develop my logical skills.",
		maxlength: 500
	},
	registered_date: {
		type: Date,
		required: true,
		default: Date.now
	},
	streak: StreakSchema,
	friends: [String],
	social_media: SocialMediaSchema,
	address: AddressSchema,
	verified: VerifiedSchema,
	languages: [String],
	solvedQuestion: [{ type: mongoose.Schema.Types.ObjectId }],
	notifications: {
		type: Boolean,
		required: true,
		default: true
	},
	history: [HistorySchema],
	miscellaneous: MiscellaneousSchema,
	verifyToken: {
		type: String,
	},
	verifyTokenExpiry:
	{
		type: Date,
		default: Date.now() + 3600000
	},
	token: {
		type: String,
		required: false
	}
});

const UserModel = (mongoose.models.users) || mongoose.model<User>('users', UserSchema)

export default UserModel;

//added field

//miscelleneous
//company, university, your_language, location emna, country ma dropdown