const { User } = require("../models"); 
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
    try {
        console.log("Signup request body:", req.body);

        const { username, email, password } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists)
            return res.status(400).json({ message: "User already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ token: generateToken(user.id), user });
    } catch (err) {
        console.error("Signup error:", err);

        res.status(500).json({ message: "Signup failed", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid credentials" });

        res.json({ token: generateToken(user.id), user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};
