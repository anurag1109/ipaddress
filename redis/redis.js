const express = require("express");
const Redis = require("ioredis");
const app = express();
app.use(express.json());

//go to redislab==>subscription==>configuration
let congiguration = {
  host: "redis-17631.c264.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 17631,
  username: "default",
  password: "epv4YyaHjeTqVmZvZDjDJ7WIJXQtmAxT",
};

const redisclient = new Redis(congiguration);

module.exports ={redisclient}