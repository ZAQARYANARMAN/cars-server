import User from "../Schemas/User.js";
import jwt from "jsonwebtoken"

const verifyRegister = async (req, res, next) => {
    try {
     const users = await User.find({username: req.body.username.trim().toLowerCase()});
     if (users.length){
        res.send("Such a username already exists.")
        return null
     }

     next();
    }
    catch (error){
        res.send(`${error.message} verifyRegister faild`);
    }
}

const verifyToken = (req, res, next) => {
    try {
      const token = jwt.verify(req.body.token, process.env.JWT_KEY);
      jwt.sign({ username: token.username, id: token._id }, process.env.JWT_KEY, {expiresIn: "1d"});
      req.body.token = token;
      next();
    }
    catch (error){
        res.send(`${error.message} verifyToken faild`);
    }
}

export { verifyRegister, verifyToken }