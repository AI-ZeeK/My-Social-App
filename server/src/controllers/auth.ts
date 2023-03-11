import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ReqRes } from "../interface.js";
import User from "../models/User.js";

export const register: ReqRes = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation,
		} = req.body;

		const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const login: ReqRes = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user: any = await User.findOne({ email });
		if (!user) {
			return res.status(200).json({ msg: "Invalid Credentials." });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: "invalid Credentials" });
		}

		const token = jwt.sign({ id: user._id }, <any>process.env.JWT_SECRET);

		delete user.password;
		res.status(200).json({ token, user });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
