const jwt = require("jsonwebtoken");
const { users } = require("../../models/index");
const { checkToken } = require("../function/index");

module.exports = {
  createUser: async (req, res) => {
    const { name, nickname, email, password } = req.body;
    if (!name || !nickname || !email || !password) {
      return res.status(400).send({ message: "Bad Request" });
    }

    users
      .findOrCreate({
        where: {
          email: email,
        },
        defaults: {
          name: name,
          nickname: nickname,
          password: password,
        },
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send({ message: "Conflict" });
        } else {
          return res.status(200).send({ message: "Created" });
        }
      });
  },
  readUser: async (req, res) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      const token = authorization.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_SECRET, async (err, data) => {
        if (err) {
          return res.status(401).send({ message: "expired token" });
        } else {
          const userInfo = await users.findOne({
            where: {
              email: data.email,
            },
            attributes: {
              exclude: ["password"],
            },
          });
          if (!userInfo) {
            return res.status(401).send({ message: "Invalid user" });
          } else {
            return res.status(200).send({ message: "ok", data: { userInfo } });
          }
        }
      });
    }
  },
  updateUser: async (req, res) => {
    //받는 3가지 어세스토큰, 비밀번호, 닉네임
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
      where: { email: tokenData.email },
    });

    if (!userInfo) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const newPassword = req.body.password;
    const newNickname = req.body.nickname;

    //둘 다 없을 때
    if (!newPassword && !newNickname) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    //닉네임만 있을 때
    if (!newPassword) {
      await userInfo.update({
        nickname: newNickname,
      });

      return res.status(200).json({
        message: "OK",
      });
    }

    //비밀번호만 있을 떄
    if (!newNickname) {
      await userInfo.update({
        password: newPassword,
      });

      return res.status(200).json({
        message: "OK",
      });
    }

    //둘 다 있을 때
    if (newPassword && newNickname) {
      await userInfo.update({
        nickname: newNickname,
        password: newPassword,
      });

      return res.status(200).json({
        message: "OK",
      });
    }
  },

  deleteUser: async (req, res) => {
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
      where: { email: tokenData.email },
    });

    if (!userInfo) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    await userInfo.destroy();

    return res.status(200).json({
      message: "OK",
    });
  },
};
