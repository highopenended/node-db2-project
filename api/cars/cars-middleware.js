const Car = require("./cars-model");
const express = require("express");
const router = express.Router();

const checkCarId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const car = await Car.getById(id);
        req.id = id;
        if (!car) {
            res.status(404).json({ message: `car with id <${id}> is not found` });
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
        res.status(400).json({ message: `<${fieldName}> is missing` });
        next();
    } else {
        req.payload={ vin, make, model, mileage, title, transmission }
        next();
    }
};

const checkVinNumberValid = (req, res, next) => {
    const vin = req.payload.vin
    const vinLength = vin.length
    const checkInt = parseInt(vin)
    if(checkInt && vinLength===17){
      req.payload.vin=checkInt
      next()
    }else{
      res.status(400).json({ message: `vin <${vin}> is invalid` });
      next()
    }
};

const checkVinNumberUnique = async (req, res, next) => {
    const vin = req.payload.vin
    try{
      const cars = await Car.getAll();
      let foundMatch=false
      cars.forEach(car => {
        if(vin==car.vin)  foundMatch=true
      });

      if(foundMatch){
        res.status(400).json({ message: `vin <${vin}> already exists` });
      }else{        
        next()
      }
    }catch(err){
      next(err)
    }
};

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
};
