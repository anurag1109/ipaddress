const { Router } = require("express");
const { login, logout, signup } = require("../controller/usercontroller");
const userrouter = Router();
const { logger } = require("../middleware/logger");
// const { redisclient } = require("../redis/redis");
const { city } = require("../model/citymodel");
const { ipvalidator } = require("../middleware/ipvalidator");
const Redis = require("ioredis");
const axios = require("axios");

let congiguration = {
  host: "redis-17631.c264.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 17631,
  username: "default",
  password: "epv4YyaHjeTqVmZvZDjDJ7WIJXQtmAxT",
};

const redisclient = new Redis(congiguration);

userrouter.post("/login", login);
userrouter.post("/signup", signup);
userrouter.get("/logout", logout);

userrouter.get("/ip/:ipaddress", ipvalidator, async (req, res) => {
  const ipaddress = req.params.ipaddress;

  const cacheddata = await redisclient.get(ipaddress);
  if (cacheddata) {
    logger.info(`using redis for ip address:${ipaddress}`);
    res.send(cacheddata);
  } else {
    try {
      const response = await axios.get(`https://ipapi.co/${ipaddress}/json/`);
      //   console.log(response);
      const data = {
        ip: response.data.ip,
        city: response.data.city || "Delhi",
        region: response.data.region || "Delhi",
      };
      //   console.log(data);
      await redisclient.set(ipaddress, JSON.stringify(data), "EX", 21600);
      const citydata = new city(data);
      await citydata.save();
      logger.info(`using mongodb data for ip address:${ipaddress}`);
      res.send(data);
    } catch (err) {
      logger.error("error fetching data", { err });
      res.status(500).send("server error");
    }
  }
});

module.exports = { userrouter };
