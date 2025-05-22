import mongoose, { isValidObjectId } from "mongoose";

const carSchema = mongoose.Schema({
    carName: {type: String, required: true, trim: true, uppercase: true, minLength: 3},
    carModel: {type: String, required: true, trim: true, minLength: 3},
    carKm: {type: Number, required: true, min: 0},
    kmCurrency: {type: String, default: "km", enum: ["km", "ml"]},
    carPrice: {type: Number, required: true, min: 0},
    priceCurrency: {type: String, default: "AMD", enum: ["AMD", "EUR", "RUB", "USD"]},
    author: {type: mongoose.Schema.ObjectId, ref: "User"},
})

export default mongoose.model("Car", carSchema)