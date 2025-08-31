import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const dateCounter = async (req, res, next) => {
    try {
        const { id, email, iat, exp } = req.user;

        const userId = id;

        const user = await User.findOne({ _id: userId });
        if(!user) {
            console.log(user);
            res.status(400).json({ message: 'Error', details: "There is no user found" });
        }

        const date = user.createdAt.toISOString();

        const year = date.split('-')[0];

        const month = date.split('-')[1];

        const months = new Map([
            ["01", "January"],
            ["02", "February"],
            ["03", "March"],
            ["04", "April"],
            ["05", "May"],
            ["06", "June"],
            ["07", "July"],
            ["08", "August"],
            ["09", "September"],
            ["10", "October"],
            ["11", "November"],
            ["12", "December"]
        ]);

        const countedMonth = months.get(month);
        
        req.dateInfo = {
            year,
            month: countedMonth
        };
        req.user = {
            nickname: user.nickname,
            username: user.username,
            id: id,
            email: email
        };

        next();

    } catch (err) {
        res.status(401).json({ message: "There is an error", error: err.message });
    }
};