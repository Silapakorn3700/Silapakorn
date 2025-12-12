const prisma = require('../prisma');

//controller functions for vehicle routes
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json({
      status: 'success',
      message: 'Vehicles retrieved successfully',
      data: vehicles,
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch rooms' },
    });
  }
};

// Get Vehicle:id
exports.getVehicleById = async (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);

  if (isNaN(vehicleId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid vehicle id',
    });
  }

  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      return res.status(404).json({
        status: 'error',
        message: 'Vehicle not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Vehicle retrieved successfully',
      data: vehicle,
    });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to fetch room' },
    });
  }
};

// create Vehicle
exports.createVehicle = async (req, res) => {
const { plateNumber, brand, model, vehicleType, capacity } = req.body;
if (!plateNumber) {
  return res.status(400).json({
    status: 'error',
    message: 'Invalid request body',
    error: {
      detail: 'name, email and password are required',
    },
  });
}
  try {
    const existsplateNumber = await prisma.user.findUnique({
      where: { plateNumber }
    });
      if (existsplateNumber) {
      return  res.status(400).json({
        status: 'error',
        message: 'plateNumber already exists',
      });
    }

    const newVehicle = await prisma.user.create({
      data: {
        plateNumber,
        brand,
        model,
        vehicleType,
        capacity:capacity||null,
      },
    });

    res.status(201).json({
      status: 'success',
      message: 'Vehicle created successfully',
      data: newVehicle,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to create user' },
    });
  }
};

// Update Vehicle
exports.updateVehicle = async (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);
  const { plateNumber, brand, model, vehicleType, capacity } = req.body;

  if (isNaN(vehicleId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user id',
    });
  }

  if (!plateNumber) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid request body',
      error: {
        detail: 'plateNumber is required',
      },
    });
  }

  try {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: {
        plateNumber,
        brand,
        model,
        vehicleType,
        capacity:capacity||null,
      },
    });

    res.json({
      status: 'success',
      message: 'Vehicle updated successfully',
      data: updatedVehicle,
    });
  } catch (error) {
    console.error('Error updating user:', error);

    // Prisma error: record not found
    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Vehicle not found',
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to update vehicle' },
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  const vehicleId = parseInt(req.params.id, 10);

  if (isNaN(vehicleId)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid vehicle id',
    });
  }

  try {
    const deletedVehicle = await prisma.vehicle.delete({
      where: { id: vehicleId },
    });

    res.json({
      status: 'success',
      message: 'Vehicle deleted successfully',
      data: deletedVehicle,
    });
  } catch (error) {
    console.error('Error deleting vejicle:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Vehicle not found',
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: { detail: 'Unable to delete user' },
    });
  }
};