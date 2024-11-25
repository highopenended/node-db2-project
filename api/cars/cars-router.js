const express = require("express");
const Car = require("./cars-model");
const router = express.Router();
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware");

router.get("/", async (req, res, next) => {
    try {
        const cars = await Car.getAll();
        res.status(200).json(cars);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", checkCarId, async (req, res, next) => {
    const id = req.params.id;
    try {
        const car = await Car.getById(id);
        res.status(200).json(car);
    } catch (err) {
        next(err);
    }
});

router.post("/",checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async (req, res, next) => {
    try {        
        const { vin, make, model, mileage, title, transmission } = req.payload;
        const newCar=await Car.create({ vin, make, model, mileage, title, transmission })
        res.status(200).json(newCar);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
