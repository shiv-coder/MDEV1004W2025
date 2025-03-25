const express = require('express');
const cors = require('cors');
const path = require('path');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend

app.use('/', courseRoutes);

// Routes
app.use('/courses', courseRoutes);

app.get('/', (req, res) => {
  res.send("Firebase Firestore API Running Successfully!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
