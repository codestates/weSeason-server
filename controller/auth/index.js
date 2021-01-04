const { users } = require("../../models/index");
const {
  checkToken,
  getAccessToken,
  getRefreshToken,
} = require("../function/index");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = {
  check: async (req, res) => {
    if (!req.cookies.refreshToken) {
      res
        .status(400)
        .send({ data: null, message: "refresh token is not exist" });
    } else {
      jwt.verify(
        req.cookies.refreshToken,
        process.env.REFRESH_SECRET,
        async (err, data) => {
          if (err) {
            res
              .status(401)
              .send({ data: null, message: "invalid refresh token" });
          } else {
            const userInfo = await users.findOne({
              where: { email: data.email },
              attributes: ["email"],
            });
            if (!userInfo) {
              res
                .status(406)
                .send({ data: null, message: "invalid user information" });
            } else {
              const accessToken = getAccessToken(userInfo.toJSON().email);
              const refreshToken = getRefreshToken(
                userInfo.toJSON().email,
                data.auth
              );
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });
              res.status(200).send({
                message: "ok",
                data: { accessToken: accessToken, auth: data.auth },
              });
            }
          }
        }
      );
    }
  },
  localSignIn: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "Bad Request" });
    } else {
      const userInfo = await users.findOne({
        where: { email: email, password: password },
        attributes: ["email"],
      });
      if (!userInfo) {
        res.status(404).send({ message: "Not Found" });
      } else {
        const accessToken = getAccessToken(userInfo.toJSON().email);
        const refreshToken = getRefreshToken(userInfo.toJSON().email, "local");
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        res.status(200).send({
          message: "ok",
          data: { accessToken: accessToken, auth: "local" },
        });
      }
    }
  },
  // oauth 로그인 요청(클라이언트로 부터 code 받아 요청)
  googleSignIn: async (req, res) => {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const { code } = req.body;
    try {
      let {
        data: { access_token: accessToken },
      } = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          client_id: clientID,
          client_secret: clientSecret,
          code,
          grant_type: "authorization_code",
          redirect_uri: "https://www.weseason4.com/auth/google",
        },
        { headers: { Accept: "application/json" } }
      );

      const {
        data: { email },
      } = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      const [userInfo, _] = await users.findOrCreate({
        where: {
          email,
        },
        attributes: ["email"],
      });
      accessToken = getAccessToken(userInfo.toJSON().email);
      const refreshToken = getRefreshToken(userInfo.toJSON().email, "google");
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).send({ accessToken: accessToken, auth: "google" });
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  },
  gihubSignIn: async (req, res) => {
    const clientID = process.env.GITHUb_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const { code } = req.body;
    try {
      let {
        data: { access_token: accessToken },
      } = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: clientID,
          client_secret: clientSecret,
          code,
        },
        { headers: { Accept: "application/json" } }
      );
      const {
        data: { email },
      } = await axios.get("https://api.github.com/user", {
        headers: { authorization: `token ${accessToken}` },
      });
      const [userInfo, _] = await users.findOrCreate({
        where: {
          email,
        },
      });
      accessToken = getAccessToken(userInfo.toJSON().email);
      const refreshToken = getRefreshToken(userInfo.toJSON().email, "github");
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).send({ accessToken: accessToken, auth: "github" });
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  },
  signout: (req, res) => {
    res.clearCookie("refreshToken").status(200).json({
      message: "OK",
    });
  },
  checkPassword: async (req, res) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const accessToken = authorization.split(" ")[1];
    const tokenData = checkToken(accessToken, process.env.ACCESS_SECRET);

    if (!tokenData) {
      return res.status(401).json({
        message: "expired token",
      });
    }

    const userInfo = await users.findOne({
      where: { email: tokenData.email, password: req.body.password },
    });
    if (!userInfo) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    return res.status(200).json({
      message: "OK",
    });
  },
};
