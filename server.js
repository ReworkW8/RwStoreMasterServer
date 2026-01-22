const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());


app.get('/RwStoreMasterServer/mainPage.json', (req, res) => {
    const filePath = path.join(__dirname, 'mainPage.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error loading mainPage.json:", err);
            return res.status(404).json({ error: "MainPage not found" });
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

/**

app.get('/RwStoreMasterServer/apps/:appName.json', (req, res) => {
    const appName = req.params.appName;
    const filePath = path.join(__dirname, 'apps', `${appName}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`App file not found: ${appName}.json`);
            return res.status(404).json({ error: "App not found" });
        }
        
        try {
            // Validate if the file is a proper JSON
            const jsonData = JSON.parse(data);
            res.setHeader('Content-Type', 'application/json');
            res.json(jsonData);
        } catch (parseErr) {
            console.error("JSON Parse Error:", parseErr);
            res.status(500).json({ error: "Internal server error: Invalid JSON format" });
        }
    });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`RwStoreMasterServer is running on port ${PORT}`);
    console.log(`Main Directory: http://localhost:${PORT}/RwStoreMasterServer/mainPage.json`);
    console.log(`App Directory:  http://localhost:${PORT}/RwStoreMasterServer/apps/[filename].json`);
});
