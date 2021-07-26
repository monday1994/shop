import "express-async-errors";
import http from 'http';
import config from './config/default';
import app from './app/app';

// Get port from environment and store in Express.
const port = process.env.PORT || config.port;
// Create HTTP server.
http.createServer(app).listen(port, () => {
    console.log(`Running on port ${port}`)

    app.init();
});
