const { users } = require('../../models/index');
const { oauthusers } = require('../../models/index');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const jwtDecode = require('jwt-decode')

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
    // console.log(req.body)
    if (!email || !password) {
      res.status(400).send({ 'message': 'Bad Request' });
    }
    else {
      const userInfo = await users.findOne({
        where: { email: email, password: password},
        attrubutes: { exclude: ['password'] }
      });
      // console.log({...userInfo.toJSON()})
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
  },

  // oauth 로그인 요청(클라이언트로 부터 code 받아 요청)
  callback: async (req, res) => {
    try {
      const clientID = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
      // (클라이언트로 부터 받은 코드와 client_id, client_secret을 인증서버로 보내면 acessToken, email 정보, refreshToken(첫 로그인시 한번만)을 받아온다)
      const resp = await axios.post('https://oauth2.googleapis.com/token', 
      {client_id: clientID, client_secret: clientSecret, code: req.body.authorizationCode, redirect_uri: 'https://localhost:3000', grant_type: 'authorization_code'}, 
      {headers: {Accept: 'application/x-www-form-urlencoded'}})
     
      const { access_token, refresh_token, id_token} = resp.data
      // 받아온 id_token을 email정보로 변환
      const decodedData = jwtDecode(id_token) 
      const email = decodedData.email
      const objEmail = {'email': email}
      const encryptedEmail = jwt.sign(objEmail, process.env.ACCESS_SECRET, { expiresIn: '5h' });
      // console.log(encryptedEmail)
      // emil과 refreshToken이 있으면(첫 로그인이면) oauthusers table에 email과 refreshToken을 저장 한후 accessToken과 email 응답
      if (refresh_token) {
        const [oauthuser, created] = await oauthusers.findOrCreate ({
          where: {
            email: email
          }, 
          defaults: {
            refreshToken: refresh_token,
          }
        })
        // 탈퇴 후 재가입 유저처리 (email 존재시 refreshToken만 교체)
        if(!created) {
          await oauthusers.update({ refreshToken: refresh_token }, {
            where: {
              email: email
            }
          });
        }    
        
        res.cookie('refreshToken', encryptedEmail, { httpOnly: true, secure: true, sameSite: 'none'});
        res.status(200).send({ 'accessToken': access_token, 'email': encryptedEmail })
      }
      // refreshToken이 없으면 accessToken과 email만 응답
      else {
        res.cookie('refreshToken', encryptedEmail, { httpOnly: true, secure: true, sameSite: 'none'});
        res.status(200).send({ 'accessToken': access_token, 'email': encryptedEmail })
      }
    }
    catch(err) {
      console.log(err)
    }
    
  },
 
  // oauth 유저 accessToken 재발급
  refreshoauth: async (req, res) => {
    try {
      const clientID = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const encryptedEmail = req.cookies.refreshToken
      
      jwt.verify(encryptedEmail, process.env.ACCESS_SECRET, async (err, data) => {
        if (err) {
          res.status(401).send({ "data": null, "message": "invalid refresh token" })
        }
        else {
          console.log(data.email)
          const user = await oauthusers.findOne({
            where: { email: data.email},
            attributes: ['refreshToken']
          })
          const {refreshToken} = user.toJSON()

          const resp = await axios.post('https://oauth2.googleapis.com/token', 
          {client_id: clientID, client_secret: clientSecret, refresh_token: refreshToken, grant_type: 'refresh_token'}, 
          {headers: {Accept: 'application/x-www-form-urlencoded'}})
          const { access_token } = resp.data
          console.log(access_token)
          res.status(200).send({ 'accessToken': access_token})
        }
      })
    }
    catch(err) {
      console.log(err)
    }
  },
}
