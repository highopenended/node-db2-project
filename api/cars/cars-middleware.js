const Car = require("./cars-model");
const express = require("express");
const router = express.Router();

const checkCarId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const car = await Car.getById(id);
        req.id = id;
        if (!car) {
            res.status(404).json({ message: `car with id ${id} is not found` });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

const checkCarPayload = (req, res, next) => {
    let { vin, make, model, mileage, title, transmission } = req.body;
    let fieldName = "";
    if (!vin) fieldName = "vin";
    if (!make) fieldName = "make";
    if (!model) fieldName = "model";
    if (!mileage) fieldName = "mileage";

    if(!title) title=null
    if(!transmission) transmission=null

    if (fieldName) {
        res.status(400).json({ message: `${fieldName} is missing` });
        next();
    } else {
        req.payload={ vin, make, model, mileage, title, transmission }
        next();
    }
};

const checkVinNumberValid = (req, res, next) => {
    // DO YOUR MAGIC
    next()
};

const checkVinNumberUnique = (req, res, next) => {
    // DO YOUR MAGIC
    next()
};

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
};
