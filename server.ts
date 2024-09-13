import http from 'http';


import app from './app'; // Import the app setup

const port = 4000;

const server = http.createServer(app); // Create an HTTP server

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
