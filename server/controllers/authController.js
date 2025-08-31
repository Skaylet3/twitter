import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { nickname, username, password, email } = req.body;

        if(!nickname || !username || !password || !email) throw new Error("All fields are required");
        
        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        try{
            newUser = await User.create({
                nickname,
                username,
                email,
                passwordHash: hashedPassword,
            });
        }catch(err){
            if(err.code === 11000){
                return res.status(409).json({ error: "Email or username already exist" });
            }
            throw err;
        }

         const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

         res
            .cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
            .status(201)
            .json({ message: "User created successfully", user: { id: newUser._id, username: newUser.username, nickname: newUser.nickname, email: newUser.email }});
    } catch(err) {
        res.status(401).json({ message: "Registration failed", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) throw new Error("All fields are required");

        const user = await User.findOne({ username }).select('+passwordHash');
        if(!user) throw new Error("The user is not found");

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({ 
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res
            .cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Lax',
                maxAge: 30 * 24 *60 * 60 * 1000
            })
            .status(200)
            .json({ 
                message: "Login successful",
                    user: {
                        id: _id,
                        username,
                        nickname,
                        avatar,

                    },
            });
        } catch(err) {
            res.status(500).json({ message: "Login failed", error: err.message });
        }
};

export const checkSomething = async (req, res) => {
        try {
            const token = req.cookies.token;
            if(!token) throw new Error("No token provided");

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            res.status(200).json({ user: decoded });
        } catch(err) {
            return res.status(401).json({ error: err.message });
        }
};

export const logOut = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            path: '/'
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch(err) {
        res.status(401).json({ error: err.message });
    }
};