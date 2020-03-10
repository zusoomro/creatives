const express = require('express');
const connectDB = require('./config/db');
const bodyParse = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// connect database
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// Use bodyparser
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
