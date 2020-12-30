const { users } = require('../../models/index');
const jwt = require('jsonwebtoken');

module.exports = {
  signIn: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ 'message': 'Bad Request' });
    }
    else {
      const userInfo = await users.findOne({
        where: { email: email, password: password},
        attrubutes: { exclude: ['password'] }
      });
      console.log({...userInfo.toJSON()})
      if (!userInfo) {
        res.status(404).send({ 'message': 'Not Found' });
      }
      else {
        const accessToken = jwt.sign({ ...userInfo.toJSON()}, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ ...userInfo.toJSON()}, process.env.REFRESH_SECRET, { expiresIn: '2h'});
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none'});
        res.status(200).send({ 'message': 'ok', 'data': { 'accessToken': accessToken } });
      }
    }
  },

  tokenMaker: async (req, res) => {
    // console.log(req.cookies)
    if (!req.cookies.refreshToken) {
      res.status(400).send({ "data": null, "message": "refresh token is not exist" });
    }
    else {
      jwt.verify(req.cookies.refreshToken, process.env.REFRESH_SECRET, async (err, data) => {
        // console.log(data)
        if (err) {
          res.status(401).send({ "data": null, "message": "invalid refresh token" })
        }
        else {
          const userInfo = await users.findOne({
            where: { email: data.email},
            attrubutes: { exclude: ['password'] }
          });
          if (!userInfo) {
            res.status(406).send({ "data": null, "message": "invalid user information" })
          }
          else {
            const accessToken = jwt.sign({...userInfo.toJSON()}, process.env.ACCESS_SECRET, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ ...userInfo.toJSON()}, process.env.REFRESH_SECRET, { expiresIn: '2h'});
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none'});
            res.status(200).send({ 'message': 'ok', 'data': { 'accessToken': accessToken } });
          }
        }
      })
    }
  },

  check: async (req, res) => {
    //토큰과, 비밀번호를 받는다.
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({
        message: 'Unauthorized'
      });
    }

    const accessToken = authorization.split(' ')[1];
    const tokenData = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    const userInfo = await users.findOne({
      where: { id: tokenData.id, name: tokenData.name, email: tokenData.email }
    });

    if (!userInfo) {
      res.status(401).json({
        message: 'expired token'
      });
    }

    if (userInfo.dataValues.password !== req.body.password) {
      res.status(400).json({
        message: 'Wrong Password'
      })
    }

    res.status(200).json({
      message: 'OK'
    });
  },

  signout: (req, res) => {
    res
    .clearCookie('refreshToken')
    .status(200)
    .json({
      message: 'OK'
    });
  }
}