const { clothes } = require('../../models/index');
const { weather } = require('../../models/index');

module.exports = {
  getClothes: async (req, res) => {
    const temp = req.query.temp
    if (temp >= 28) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 1},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else if (temp >= 23 && temp <=27) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 2},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else if (temp >= 20 && temp <=22) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 3},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else if (temp >= 17 && temp <=19) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 4},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else if (temp >= 12 && temp <=16) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 5},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else if (temp >= 9 && temp <=11) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 6},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else if (temp >= 5 && temp <=8) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 7},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else if (temp <=4) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 8},
          attributes: []
        }]
      });
      const matchedClothed = match.map(el => el.cloth)
      res.status(200).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      });
    }

    else {
      res.status(400).send({ "message": 'invalid temperature'})
    }

    
    
  }
}