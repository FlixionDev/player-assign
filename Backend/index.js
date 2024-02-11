const express = require("express");
const cors = require("cors");
const app = express();
const {isLogin}=require("./middleware/isLogin.middleware")
const { db } = require("./Configs/db")
const { userRouter } = require("./Routes/User.Routes")
const {playerRouter}=require("./Routes/Player.Routes")
app.use(express.json())
app.use(cors());
app.get("/", (req, res) => {
    res.send({ "message": "Home" })
})
app.use("/user", userRouter)
app.use(isLogin)

app.use("/",playerRouter)
app.listen(3000, async () => {
    try {
        await db;
        console.log("Server is connected to db");
    } catch (err) {
        console.log(err);
    }
    console.log("Server is running on http://localhost:3000");
})