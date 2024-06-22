const express = require('express');
const mongoose = require('mongoose');
const visitsRoute = require('./api/visits');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/api/visits', visitsRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
