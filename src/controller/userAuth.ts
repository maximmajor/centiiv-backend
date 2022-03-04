import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/userManagement"

const secretKey = process.env.TOKEN_SECRET as string;


export async function loginPage(req: Request, res: Response) {
    try {
        const email = req.body.email;
        let regUser: any = await User.findOne({ email: email });
        //console.log(regUser)
        if (!regUser) return res.status(400).json('Invalid Email Address');
        if (!regUser.isVerified) return res.status(400).json('your account is not verified')
        if (regUser.password) {
            if (!regUser.password) return res.status(400).send('Invalid Email or Password');
            const validPassword = await bcrypt.compare(req.body.password, regUser.password);
            if (!validPassword) return res.status(400).json('Invalid Password');
            const token = jwt.sign({ _id: regUser._id.toString() }, secretKey, { expiresIn: '72000000 seconds' });
            res.cookie('jwt', token);
            res.status(200).send({ regUser, token });
        } else {
            return res.status(400).json('Invalid Email or Password');
        }
    } catch (err) {
        res.status(500).send( "Server error"
        )
    }
}