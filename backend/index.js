const express = require("express");
require('./database');
const cors = require('cors');
const usersRouter = require('./routes/usersRouter');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

// Start server
const PORT = process.env.PORT || 3030;
app.get('/', (req, res) => {
  res.send('<h2>This is from index.js file</h2>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

