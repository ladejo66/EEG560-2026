const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Load the Excel file
const workbook = xlsx.readFile('results.xlsx'); // Make sure this file is in the same folder as server.js
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

// Endpoint to fetch student results based on Matric No
app.get('/result/:matricNo', (req, res) => {
    const matricNo = req.params.matricNo;

    // Log all rows from the Excel file to see their structure
    data.forEach(row => console.log(row['Matric No']));

    const student = data.find(row => {
        const matricNoInFile = String(row['Matric No'] || '').trim(); // Convert to string and trim
        return matricNoInFile === matricNo.trim();
    });

    if (student) {
        res.json(student); // Send the student's result as JSON
    } else {
        res.status(404).send({ message: 'Matric No not found!' });
    }
});

// Start the backend server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
