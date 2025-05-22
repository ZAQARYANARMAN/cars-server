import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASS,
    },
});

const sendMail = (mail, text) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: mail,
        subject: "Hello Nodemailer✔️",
        text: text,
    }, (error) => {
        console.log("hello world")
        if (error) {
            console.log(error)
            return error;
        } else {
            console.log("mail is send")
        }
    })
}

export default sendMail