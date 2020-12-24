const { users } = require('../../models/index');

module.exports = {
  updateUser: async (req, res) => {
      //여기 문제가 있다. 받는 정보가 더 필요하다. 패스워드가 같은 회원이 있다면.
    const userInfo = await users.findOne({
      where: {password: req.body.passwordCheck} //api 북과 다른 부분
    });

    if (!userInfo) {
      res.status(422).json({
        message: 'Invalid Password'
      });

      done();
    }

    const newPassword = req.body.password;
    const newNickname = req.body.nickname;

    //닉네임이나 비밀번호 입력한 것이 기존과 같을 경우
    if (userInfo.dataValues.password === newPassword ||
        userInfo.dataValues.nickname === newNickname) {
      res.status(406).json({
        message: 'Nothing Changed'
      });

      done();
    }

    //둘 다 없을 때
    if (!newPassword && !newNickname) {
      res.status(400).json({
        message: 'Bad Request'
      });

      done();
    }

    //닉네임만 있을 때
    if (!newPassword) {
      await userInfo.update({
        nickname: newNickname
      });

      res.status(200).json({
        message: 'OK'
      });

      done();
    }

    //비밀번호만 있을 떄
    if (!newNickname) {
      await userInfo.update({
        password: newPassword
      });

      res.status(200).json({
        message: 'OK'
      });

      done();
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

      done();
    }
  },

  deleteUser: async (req, res) => {
    if (!req.session.userid) {
      res.status(401).json({
        message: 'Get Out Of Here'
      });

      done();
    }

    const userInfo = await users.findOne({
      where: {id: req.session.userid}
    });

    if (!userInfo) {
      res.status(401).json({
        message: 'Get Out Of Here'
      });
    
      done();
    }

    await userInfo.destroy();

    res.status(200).json({
        message: 'OK'
    });
  
    done();
  }
}