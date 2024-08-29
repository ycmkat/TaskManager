const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
// For the purpose of this challenge, the password is exposed here but in reality, the URI should be in a .env file for security reasons
const mongoURI = 'mongodb+srv://user:passwordpassword@kayo3pl.hthoz.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=kayo3pl';
mongoose.connect(mongoURI)
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
