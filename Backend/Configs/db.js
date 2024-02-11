const mongoose=require("mongoose");
require("dotenv").config()
const db=mongoose.connect(`${process.env.url}`);
module.exports={
    db
}