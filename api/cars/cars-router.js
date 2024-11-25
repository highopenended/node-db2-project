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
    res.json("getting all cars");
});

router.get("/:id", checkCarId, async (req, res, next) => {
    // res.json(`getting car with id ${req.params.id}`)
    const id = req.params.id;
    try {
        const car = await Car.getById(id);
        res.status(200).json(car);
    } catch (err) {
        next(err);
    }
});

router.post("/",checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async (req, res, next) => {
    res.json("posting new car");
});

module.exports = router;
