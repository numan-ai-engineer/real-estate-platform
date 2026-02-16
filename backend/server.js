const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/realestate')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});