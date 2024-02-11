const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../Models/User.Model")
userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        let data = await UserModel.find({ email });
        if (data.length > 0) {
            res.send({ "message": "User already registered" })
        } else {
            bcrypt.hash(pass, 5, async (err, hash) => {
                if (err) {
                    console.log(err);
                    res.send({ "message": err })
                } else {
                    let user = new UserModel({ name, email, pass: hash });
                    await user.save();
                    res.send({ "message": "Registration successful" })
                }
            });
        }


    } catch (err) {
        res.send({ "message": err })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        let data = await UserModel.find({ email });
        if (data.length > 0) {

                bcrypt.compare(pass, data[0].pass, (err, result) => {
                    if (result) {
                        let token = jwt.sign({ userId: data[0]._id }, 'masai');
                        res.send({ "message": "login successful", token })
                        
                    } else {
                        res.send({ "message": "Incorrect password" })
                    }
                });

        } else {
            res.send({ "message": "No account found. Please Signup first" });
        }


    } catch (err) {
        res.send({ "message": err })
    }
})
module.exports = { userRouter }