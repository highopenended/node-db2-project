const Car = require("./cars-model");

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
    if (!title) title = null;
    if (!transmission) transmission = null;

    if (!fieldName) {
      req.payload = { vin, make, model, mileage, title, transmission };
      next();
    } else {
      return res.status(400).json({ message: `${fieldName} is missing` });
    }
};

const checkVinNumberValid = (req, res, next) => {
    const vin = req.payload.vin;
    const vinLength = vin.length;
    const vinInt = parseInt(vin)
    const checkInt = (typeof vinInt === 'number' && !Number.isNaN(vinInt) && !(vin===null))
    if (checkInt && vinLength === 17) {
        req.payload.vin = vin;
        next();
    } else {
        return res.status(400).json({ message: `vin ${vin} is invalid` });
    }
};

const checkVinNumberUnique = async (req, res, next) => {
    const vin = req.payload.vin;
    try {
        const cars = await Car.getAll();
        let foundMatch = false;
        cars.forEach((car) => {if (vin == car.vin) foundMatch = true;});
        if (!foundMatch) {
          next();
        } else {
          return res.status(400).json({ message: `vin ${vin} already exists` });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
};
