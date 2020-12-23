'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clothes', [{
      cloth: '민소매',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '반팔',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '반바지',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '짧은 치마',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '린넨 옷',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '반팔티',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '얇은 셔츠',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '면바지',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '원피스',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '긴팔티',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '얇은 가디건',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '청바지',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '블라우스',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '슬랙스',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '7부바지',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '얇은 재킷',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '맨투맨',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '후드',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '긴바지',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '바람막이',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '야상',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '니트',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '살구색 스타킹',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '청재켓',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '기모 후드',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '항공점퍼',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '셔츠',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '재킷',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '트렌치코트',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '검은색 스타킹',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '울코트',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '가죽 재킷',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '스카프',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '두꺼운 바지',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '가죽 옷',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '히트텍',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '캐시미어 코트',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '플리스 재킷',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '경량패딩',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '목폴라',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '패딩',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '두꺼운 코트',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '목도리',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '기모제품',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '누빔옷',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '장갑',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '히트텍',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      cloth: '발열내의',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clothes', null, {});
  }
};
