/* 
    Homework Assignment 1
    ---------------------
    A simple RESTful API that will return a JSON payload
    if the '/hello' route is called.  The query string
    can include a 'name' parameter, eg., '/hello?name=jim'
    The API will return a 404 Not Found Error if an unknown
    route is sent in the request. 
 */


/* 
    Dependencies 
*/
const server = require('./server');

/* 
    Main Section 
*/
server.Create(2000);
