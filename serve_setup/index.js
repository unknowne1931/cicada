const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 80;
const https = require('https')


// //https

const key = fs.readFileSync('private.key')
const cert = fs.readFileSync('certificate.crt')
const cred = {
  key,
  cert
}

const httpsServer = https.createServer(cred, app)
httpsServer.listen(443);
// //https end


// Define the route to read and send the file
app.get('/.well-known/pki-validation/635CB437BDCF606745F09DD7CE863687.txt', (req, res) => {
    const filePath = path.join(__dirname, 'files', '635CB437BDCF606745F09DD7CE863687.txt');

    // Read the file from the filesystem
    fs.readFile("./635CB437BDCF606745F09DD7CE863687.txt", 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
            return;
        }

        // Send the file content as the response
        res.send(data);
    });
});

// Start the server and listen on the specified port
// app.listen(port, () => {
//     console.log(`Server is running at http://192.168.210.78:${port}`);
// });