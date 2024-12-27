const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		// Validate user input
		const { error } = validate(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		// Check if the user already exists
		const user = await User.findOne({ email: req.body.email });
		if (user) return res.status(409).send({ message: "User with given email already exists!" });

		// Hash the password
		const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		// Create and save the new user
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });

	} catch (error) {
		console.error("Error during user registration:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
