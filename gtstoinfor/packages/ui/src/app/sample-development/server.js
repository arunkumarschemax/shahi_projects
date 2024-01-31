const express = require('express');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const { config } = require('packages/libs/shared-services/config');

const app = express();
const PORT = config.PORT;

app.get('/api/download-directory', (req, res) => {
  const directoryPath = path.join(__dirname, 'your_directory_path'); // Replace with your actual directory path

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level
  });

  // Create a write stream to the response
  archive.pipe(res);

  // Add the entire directory to the archive
  archive.directory(directoryPath, false);

  archive.finalize();
archive.on('error', function(err) {
  console.error(err);
  res.status(500).send('Error creating zip file');
});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
