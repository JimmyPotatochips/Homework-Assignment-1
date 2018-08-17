/* 
    Define the routeHandler functionality
    The returned payload will be {welcome: name}
    If a name wasn't sent in the query string, default to hot stuff
*/
let routeHandler = {
    hello: (data, callback) => {
        let payload = {};
        let name = data.queryString['name'] !== undefined ? data.queryString['name'] : 'hot stuff';
        payload = {welcome: `Hey there ${name}`};
        callback(200, payload);
    },
    notFound: (data, callback) => callback(404)
};

/* 
    Define the router and assign the routeHandler to the routes
*/
let router = {
    'hello': routeHandler.hello
};

/* 
    Exports Section 
*/
module.exports = {
    router: router,
    routeHandler: routeHandler
};