import sendMail from "../helpers/mailer.js";
import Car from "../Schemas/Car.js";
import User from "../Schemas/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const oneTimePass = Date.now() * Math.round(Math.random() * 9000);

        await User.create({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            status: 0,
            oneTimePass: oneTimePass,
        });

        sendMail(req.body.mail, `http://${req.headers.host}/user/verifyEmail?oneTimePass=${oneTimePass}`);
        res.send("Please verify your Email");
    }
    catch (error) {
        res.send(`${error.message} register faild`);
    }
}

const verifyEmail = async (req, res) => {
    try {
        const updatedDocument = await User.findOneAndUpdate({ oneTimePass: +req.query.oneTimePass }, { status: 1, oneTimePass: null }, { new: true });

        if (updatedDocument) {
            const token = jwt.sign({ username: updatedDocument.username, id: updatedDocument._id }, process.env.JWT_KEY, { expiresIn: "1d" });
            res.send(`Congratulations, you have registereդ, this is your token ${token}`);
        } else {
            res.send("The request is not valid.");
        }
    }
    catch (error) {
        res.send(`${error.message} verifyEmail faild`);
    }
}

const getProductsOfUser = async (req, res) => {
    try {
        const products = await Car.find({ author: req.query.id })
        res.send(products);
    }
    catch (error) {
        res.send(`${error.message} getProductsOfUser faild`);
    }
}

export { register, verifyEmail, getProductsOfUser }