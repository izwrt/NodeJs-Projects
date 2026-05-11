import http from "node:http";
import type { RequestListener } from "node:http";

// The handler function processes all incoming HTTP requests
const handler: RequestListener = (req, res) => {
    console.log(`Incomming Request at [${new Date().toLocaleString()}]`);

    // Basic routing using the requested URL path
    switch(req.url) {
        case '/':
            res.writeHead(200); // 200 OK
            return res.end(`Homepage`);

        case '/contact-us':
            res.writeHead(200)
            return res.end(`Contact me at izwrt@gmail.com`);
        
        default:
            res.writeHead(400); // 400 Bad Request / Not Found
            return res.end(`Page not found`);
    }
};

// Create the HTTP server and attach the handler
const server = http.createServer(handler);

// Start the server on port 8000
server.listen(8000, () => {
    console.log("Server is listening....!")
});
