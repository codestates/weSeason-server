const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

module.exports = {
  checkResultFetch: (somLat, somLon, key) => {
    try {
      return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${somLat}&lon=${somLon}&exclude=current,daily,minutely&appid=${key}`
      );
    }
  
    catch {
      return null;
    }
  },

  checkToken: (someToken, tokenKey) => {
    try {
      return jwt.verify(someToken, tokenKey);
    }
  
    catch (err) {
      return null;
    }
  },

  extractData: (obj, arr) => {
    let data = {};
    
    delete obj.weather[0].id;
  
    data.dt = obj.dt;
    data.temp = Math.round((obj.temp - 273.15) * 100) / 100;
    data.feels_like = Math.round((obj.feels_like - 273.15) * 100) / 100;
    data.weather = obj.weather;
  
    arr.push(data);
    return;
  }
}