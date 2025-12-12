require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicle.route');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//hello world
app.get('/', (req, res) => {
  res.send('Welcome to the Newton Fleet API');
});

app.use('/vehicles', vehicleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});