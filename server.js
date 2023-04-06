// Importing Express.js
const express = require('express');

// Initializing an instance of Express.js
const app = express();      

// Specifying on which port the Express.js server will run
const PORT =  process.env.PORT || 3001;

const htmlRoutes = require('./routes/htmlRoutes');
const notesRoutes = require('./routes/notesRoutes');

// Static middleware pointing to the public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//API routes
app.use('/', htmlRoutes);
app.use('/api', notesRoutes);

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
