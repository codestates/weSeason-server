const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

module.exports = {
  getAccessToken: (email) => {
    return jwt.sign({ email }, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  },
  getRefreshToken: (email, auth) => {
    return jwt.sign({ email, auth }, process.env.REFRESH_SECRET, {
      expiresIn: "2h",
    });
  },
  checkResultFetch: (somLat, somLon, key) => {
    try {
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${somLat}&lon=${somLon}&exclude=current,daily,minutely&units=metric&appid=${key}`
      );
    } catch {
      return null;
    }
  },
  checkToken: (someToken, tokenKey) => {
    try {
      return jwt.verify(someToken, tokenKey);
    } catch (err) {
      return null;
    }
  },
  extractData: (obj, arr) => {
    let data = {};

    delete obj.weather[0].id;

    data.dt = obj.dt;
    data.temp = obj.temp;
    data.feels_like = obj.feels_like;
    data.weather = obj.weather;

    arr.push(data);
  },
};
