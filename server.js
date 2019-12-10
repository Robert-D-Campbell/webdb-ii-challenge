const express = require("express");

const CarsRouter = require("./cars/cars-router.js");

const server = express();

server.use(express.json());
server.use("/api/cars", CarsRouter);

server.get("/", (req, res) => {
  res.send("<h3>DB Helpers with knex</h3>");
});

module.exports = server;
