import "express-async-errors";
import http from 'http';
import config from './config/default';
import app from './app/app';
import {logger} from './middlewares/logger';

// Get port from environment and store in Express.
const port = process.env.PORT || config.server.port;
// Create HTTP server.
app.init();
http.createServer(app).listen(port, () => {
    logger.info(`Server running on port ${port}`)
});
