import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
const router = Router();
import User from "../models/userManagement"
import bcrypt from 'bcrypt';
const EmailValidator = require('email-deep-validator')
const emailValidator = new EmailValidator()
import sendMail from "../middlewear/verifySignUp"

const secret: string = process.env.ACCESS_TOKEN_SECRET as string;


export const signUp = async (req: any, res: Response, next: NextFunction) => {
    const existEmail = await User.findOne({ email: req.body.email })
    const myemail = await emailValidator.verify(req.body.email)
    if (myemail.validDomain === false) {
        res.status(404).json('invalid Email address')
        return
    }
    if (existEmail) {
        res.status(404).json('email already exist')
        return
    }
    else {
        try {
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword
            })
            try {
                const subject = "Account Verification"
                const email = req.body.email
                const body = `<h2>Please click on the given <a href="https://localhost:3000/user/verify/${email}">link</a> to Verify your acount.</h2></br>
      <h3>This link expires in 15mins</h3>`
                await sendMail(subject, email, body)
                const savedUser: any = await newUser.save()
                const { password, ...others } = savedUser._doc
                res.status(200).json({ ...others })
            }
            catch (err) {
                res.status(500).json(err)
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}

export const verifyAccount = async (req: any, res: Response, next: NextFunction) => {
    try {
        const args = req.params.email
        if (!args) {
            throw new Error('Thrown here');
        }
        await User.findOneAndUpdate({ email: args }, { isVerified: true }, { new: true });
        res.status(201).json("Congratulation: Account Verified Successful!!!")
    } catch (err: any) {
        res.status(404).json({ msg: 'Invalid Token!!!' });
        return;
    }
}