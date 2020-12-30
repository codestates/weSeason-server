const { users } = require('../../models/index');
const jwt = require('jsonwebtoken');

//토큰 체크 함수
const checkToken = (someToken, tokenKey) => {
  try {
    return jwt.verify(someToken, tokenKey);
  }

  catch (err) {
    return null;
  }
}

module.exports = {
  signIn: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send('Bad Request');
    }
    else {
      const userInfo = await users.findOne({
        where: { email: email, password: password},
        attrubutes: { exclude: ['password'] }
      });
      console.log({...userInfo.toJSON()})
      if (!userInfo) {
        res.status(404).send('Not Found');
      }
      else {
        const accessToken = jwt.sign({ ...userInfo.toJSON()}, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ ...userInfo.toJSON()}, process.env.REFRESH_SECRET, { expiresIn: '2h'});
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none'});
        res.status(200).send({ 'data': { 'accessToken': accessToken }, 'message': 'ok'});
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
          res.status(400).send({ "data": null, "message": "invalid refresh token" })
        }
        else {
          const userInfo = await users.findOne({
            where: { email: data.email},
            attrubutes: { exclude: ['password'] }
          });
          if (!userInfo) {
            res.status(200).send({ "data": null, "message": "invalid user information" })
          }
          else {
            const accessToken = jwt.sign({...userInfo.toJSON()}, process.env.ACCESS_SECRET, { expiresIn: '15s' });
            const refreshToken = jwt.sign({ ...userInfo.toJSON()}, process.env.REFRESH_SECRET, { expiresIn: '1h'});
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'none'});
            res.status(200).send({ 'data': { 'accessToken': accessToken }, 'message': 'ok ref'});
          }
        }
      })
    }
  },

  check: async (req, res) => {
    //토큰과, 비밀번호를 받는다.
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    const accessToken = authorization.split(' ')[1];
    const tokenData = checkToken(accessToken, process.env.ACCESS_SECRET);

    if (!tokenData) {
      return res.status(401).json({
        message: 'expired token'
      });
    }

    const userInfo = await users.findOne({
      where: { id: tokenData.id, name: tokenData.name, email: tokenData.email }
    });

    if (!userInfo) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    if (userInfo.dataValues.password !== req.body.password) {
      return res.status(400).json({
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