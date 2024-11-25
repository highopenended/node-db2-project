const Car = require("./cars-model");
const express = require("express");
const router = express.Router();

const checkCarId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const car = await Car.getById(id);
        req.id = id;
        if (!car) {
            res.status(404).json({message: `car with id ${id} is not found` });
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

const checkCarPayload = (req, res, next) => {
  

};

const checkVinNumberValid = (req, res, next) => {
    // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
    // DO YOUR MAGIC
};

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
};
