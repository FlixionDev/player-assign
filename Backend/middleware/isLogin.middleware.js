const jwt = require("jsonwebtoken")
const isLogin=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token, 'masai', (err, decoded) =>{
            if(err){
                res.send({"message":"Something went wrong. Please login again !"})
            }else{
                req.body.userId=decoded.userId;
                next();
            }
          });
    }else{
        res.send({"message":"Please login first !"})
    }
    //console.log(req.headers.authorization)
}
module.exports={isLogin}