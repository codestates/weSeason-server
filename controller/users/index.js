const { users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  //회원 가입
  post: async (req, res) => {
    const { name, nickname, email, password} = req.body;

    // findOrCreate
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
        return res.status(409).send('conflict')
      }
      const data = await user.get({ plain: true });
      res.status(200).json(data)
    })  

    // findOne
    // if (!name || !nickname || !email || !password) {
    //   return res.status(400).send('Bad request')
    // }
    // else {
    //   const inUser = await users.findOne({ where: { email } });
    //   if (inUser) {
    //     return res.status(409).send("conflict")
    //   }
    //   else {
    //     const newUser = await users.create(req.body)
    //     res.status(201).send(newUser)
    //   }
    // }
  },

  // 유저정보
  // test 끝나고 async 삭제
  get: async (req, res) => {
    const userInfo = await users.findOne({
      where : {
        email: req.params.email
      },
      attributes: {
        exclude: ['password']
      }
    });
    if (!userInfo) {
      return res.status(401).send('Unauthorized')
    }
    else {
      res.status(200).send({"message": "ok", "data": { userInfo }})
    }
    // const authorization = req.headers['authorization']

    // if (!authorization) {
    //   return res.status(401).send('Unauthorized')
    // }
    // else {
    //   const token = authorization.split(' ')[1];
    //   jwt.verify(token, process.env.ACCESS_SECRET, async (err, data) => {
    //     if (err) {
    //       return res.status(401).send('Unauthorized')
    //     }
    //     else {
    //       const userInfo = await users.findOne({
    //         where : {
    //           email: data.email
    //         },
    //         attributes: {
    //           exclude: ['password']
    //         }
    //       });
    //       if (!userInfo) {
    //         return res.status(401).send('Unauthorized')
    //       }
    //       else {
    //         res.status(200).send({"message": "ok", "data": { userInfo }})
    //       }
    //     }
    //   })
    // }
  }
};
