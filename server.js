/* 
    Dependencies 
*/
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const routes = require('./routes');

/* 
    Only method exported for server, required to create an instance of a server.
    If a port is not provided, the default port will be assigned to 3000 
*/
let Create = (port) => {
    let ws = http.createServer((req, res) => {
        let request = requestProperties(req);
        
        // Verify if the path in the http request is a valid route, if not assign the 'notFound' handler.
        let chosenHandler = typeof(routes.router[request.path]) !== 'undefined' ? routes.router[request.path] : routes.routeHandler.notFound;

        // Route the request to the handler, use the request object as the data input to the handler
        chosenHandler(request, (statusCode, payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};
            let payloadString = JSON.stringify(payload);

            // Return the status code and payload as JSON in the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

    // Set the default port to 3000 if not provided
    port = typeof(port) == 'number' ? port : 3000;
    ws.listen(port, () => console.log(`Server is started and listening on Port ${port}`));
};

/* 
    Return an object containing the parsed path, query string, method, and headers
    from the req object 
*/
let requestProperties = (req) => {
    let parsedUrl = url.parse(req.url, true);

    let requestObject = {
        path: (() => {return (parsedUrl.pathname).replace(/^\/+|\/+$/g, '');})(),
        queryString: parsedUrl.query,
        method: req.method.toLowerCase(),
        headers: req.headers
    };
    return requestObject;
};

/* 
    Exports Section 
*/
module.exports = {
    Create: Create
};