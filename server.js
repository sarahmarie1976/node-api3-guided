const express = require("express"); // importing a CommonJS module
const morgan = require("morgan"); // third party, needs npm instal morgan

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// global middlware - applies to every request
server.use(express.json()); // built-in middleware, no need to npm install
// server.use(gatekeeper);
server.use(morgan("combined"));

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
    const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.post('/cars', addDoors, addMirrors, (req, res) => {  // adding our custom middleware
     // const car = req.body;  // ---> instead of creating this we are adding req.car in our res.status
    console.log("req.car", req.car);
    res.status(200).json(req.car);
});

function addMirrors(req, res, next) {

    req.car.doors.mirrors = "coolcat mirrors";
   
    next();
};

function addDoors(req, res, next) {
    let car = req.body;

    car.doors = {};

    req.car = car;

    next();
} 


// the three amigas
   function gatekeeper(req, res, next) {
       const seconds = new Date().getSeconds();
   
       if (seconds % 3 === 0) {
           res.status(401).json({ you: "shall no pass" });
       } else {
           next();
       }

       /*  return 401 whent the seconds on the clock are divisible by 3
        read the seconds
        if seconds are a multiple of 3, return 401
        if not, call next()
*/
   }




module.exports = server; 
