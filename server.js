const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://daniel-maro:P9sjjkW77ElyrEf1@atlascluster.nkugzlz.mongodb.net/benevolence-meeting-attendance?retryWrites=true&w=majority&appName=AtlasCluster', 
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const attendanceRoutes = require('./routes/attendance');
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5010;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
