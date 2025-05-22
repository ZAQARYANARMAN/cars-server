import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {type: String, reuqired: true, lowercase: true, trim: true, minlength: 3},
    fullname: {type: String, uppercase: true, trim: true},
    mail: {type: String, trim: true, required: true, match: [/^\S+@\S+\.\S+$/, 'Email format is invalid']},
    password: {type: String, required: true, trim: true, minlength: 8},
    status: {type: Number},
    oneTimePass: {type: Number}
})

export default mongoose.model("User", userSchema)