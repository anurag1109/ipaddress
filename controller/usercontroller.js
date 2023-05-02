const { user } = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const redisclient = require("../redis/redis")

const Redis = require("ioredis");
let congiguration = {
  host: "redis-17631.c264.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 17631,
  username: "default",
  password: "epv4YyaHjeTqVmZvZDjDJ7WIJXQtmAxT",
};
const redisclient = new Redis(congiguration);

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isuserpresent = await user.findOne({ email });
    if (isuserpresent) {
      return res.send("user already signedup");
    }
    const hash = await bcrypt.hash(password, 4);
    const newuser = new user({ name, email, password: hash });
    await newuser.save();
    res.send("signup successfull");
  } catch (err) {
    res.send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isuserpresent = await user.findOne({ email });
    if (!isuserpresent) {
      return res.send("user not exist");
    }
    const ispasswordcorrect = await bcrypt.compare(
      password,
      isuserpresent.password
    );
    if (!ispasswordcorrect) {
      return res.send("password incorrect");
    }
    const token = await jwt.sign({ userid: isuserpresent._id }, "masai", {
      expiresIn: "1h",
    });
    res.send({ msg: "login successfull", token });
  } catch (err) {
    res.send(err.message);
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers?.authorization;
    if (!token) return res.status(403);
    redisclient.set(token, token, (err) => {
      if (err) return res.status(500).send("error");
      res.send("logout successfull");
    });
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = { login, logout, signup };
