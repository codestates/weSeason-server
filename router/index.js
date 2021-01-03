const express = require("express");
const router = express.Router();
const usersController = require("../controller/users/index");
const authController = require("../controller/auth/index");
const clothesController = require("../controller/clothes/index");
const weatherController = require("../controller/weather/index");
//user
router.post("/users", usersController.createUser); // 유저 생성
router.get("/users", usersController.readUser); // 유저 정보읽어오기
router.patch("/users", usersController.updateUser); //유저 정보업데이트
router.delete("/users", usersController.deleteUser); //유저 삭제
//auth
router.get("/auth/check", authController.check); // 로그인 확인
router.post("/auth/local", authController.localSignIn); // username,password 로그인
router.post("/auth/google", authController.googleSignIn); // google 로그인
router.post("/auth/github", authController.gihubSignIn); // github 로그인
router.post("/auth/checkpassword", authController.checkPassword); // password 확인
router.post("/auth/signout", authController.signout); // 로그아웃
//weather
router.get("/weather", weatherController.getWeathers); // 날씨 정보 읽어오기
//clothes
router.get("/clothes", clothesController.getClothes); // 옷 정보 읽어오기

module.exports = router;
