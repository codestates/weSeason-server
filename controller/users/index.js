const { users } = require('../../models/index');
const jwt = require('jsonwebtoken');

module.exports = {
  updateUser: async (req, res) => {
    //받는 3가지 어세스토큰, 비밀번호, 닉네임
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

    const newPassword = req.body.password;
    const newNickname = req.body.nickname;

    //닉네임이나 비밀번호 입력한 것이 기존과 같을 경우
    if (userInfo.dataValues.password === newPassword ||
        userInfo.dataValues.nickname === newNickname) {
      res.status(406).json({
        message: 'Nothing Changed'
      });
    }

    //둘 다 없을 때
    if (!newPassword && !newNickname) {
      res.status(400).json({
        message: 'Bad Request'
      });
    }

    //닉네임만 있을 때
    if (!newPassword) {
      await userInfo.update({
        nickname: newNickname
      });

      res.status(200).json({
        message: 'OK'
      });
    }

    //비밀번호만 있을 떄
    if (!newNickname) {
      await userInfo.update({
        password: newPassword
      });

      res.status(200).json({
        message: 'OK'
      });
    }

    //둘 다 있을 때
    if (newPassword && newNickname) {
      await userInfo.update({
        nickname: newNickname,
        password: newPassword
      });

      res.status(200).json({
        message: 'OK'
      });
    }
  },

  deleteUser: async (req, res) => {
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

    await userInfo.destroy();

    res.status(200).json({
        message: 'OK'
    });
  },
  
  infoUser: async (req, res) => {
    const authorization = req.headers['authorization']
    
    if (!authorization) {
      return res.status(401).send({ "message": 'Unauthorized' })
    }
    else {
      const token = authorization.split(' ')[1];

      jwt.verify(token, process.env.ACCESS_SECRET, async (err, data) => {
        if (err) {
          return res.status(401).send({ "message": 'expired token' })
        }
        else {
          const userInfo = await users.findOne({
            where : {
              email: data.email
            },
            attributes: {
              exclude: ['password']
            }
          });
          if (!userInfo) {
            return res.status(401).send({ "message": 'Invalid user' })
          }
          else {
            res.status(200).send({"message": "ok", "data": { userInfo }})
          }
        }
      })
    }
  },

  createUser: async (req, res) => {
    const { name, nickname, email, password } = req.body;
    if (!name || !nickname || !email || !password) {
      res.status(400).send({ "message": 'Bad Request' })
    }

    users.findOrCreate ({
      where: {
        email: email
      }, 
      defaults: {
        name: name,
        nickname: nickname,
        password: password
      }
    })
    .then(async ([user, created]) => {
      if (!created) {
        return res.status(409).send({ "message": 'Conflict' });
      }
      else {
        res.status(200).send({ "message": 'Created' });
        }
    });
  }
}