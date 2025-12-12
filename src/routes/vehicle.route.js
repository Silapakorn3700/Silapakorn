const express = require('express');
const app = express.Router();
const controller = require('../controllers/vehicle.controller');

app.get('/', controller.getAllVehicles);

app.get('/:id', controller.getVehicleById);

app.post('/', controller.createVehicle);

app.put('/:id', controller.updateVehicle);

app.delete('/:id', controller.deleteVehicle);

module.exports = app;