const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Create playlists directory if it doesn't exist
const playlistsDir = path.join(__dirname, 'playlists');
if (!fs.existsSync(playlistsDir)) {
    fs.mkdirSync(playlistsDir);
}

// Endpoint to save the user's playlist
app.post('/save-playlist', (req, res) => {
    const { userId, playlist } = req.body;

    // Define the path to the playlist file
    const filePath = path.join(playlistsDir, `${userId}.json`);

    // Save the playlist data to a file
    fs.writeFile(filePath, JSON.stringify(playlist), (err) => {
        if (err) {
            console.error('Error saving playlist:', err);
            return res.status(500).json({ message: 'Error saving playlist' });
        }
        res.json({ message: 'Playlist saved successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
