const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

const dbPath = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 3000;

app.get('/api/tasks', async (req, res) => {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData.tasks || []);
    } catch (error) {
        console.error('API ERROR:', error);
        res.status(500).json({ error: 'Failed to retrieve task data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
