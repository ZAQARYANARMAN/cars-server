import Car from "../Schemas/Car.js";

const createCar = async (req, res) => {
    try {
        await Car.create({ ...req.body, author: req.body.token.id });
        res.send("Car is add");
    }
    catch (error) {
        res.send(`${error.message} createCar faild`);
    }
}

const searchCar = async (req, res) => {
    try {
        const { minPrice, maxPrice, name, model } = req.body
        const obj = { $and: [] }
        minPrice ? obj.$and.push({ carPrice: { $gt: +minPrice } }) : ""
        maxPrice ? obj.$and.push({ carPrice: { $lt: maxPrice } }) : ""
        name ? obj.carName = name : "";
        model ? obj.carModel = model : "";

        const cars = await Car.find(obj).skip(+req.query.skip).limit(+req.query.limit)
        res.send(cars)
    }
    catch (error) {
        res.send(`${error.message} searchCar faild`);
    }
}

const getCar = async (req, res) => {
    try {
        const car = await Car.find({ _id: req.query.id }).populate({path: "author", select: "username fullname"});
        res.send(car)
    }
    catch (error) {
        res.send(`${error.message} getCar faild`)
    }
}

export { createCar, searchCar, getCar }