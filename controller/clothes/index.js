const { clothes } = require('../../models/index');
const { weather } = require('../../models/index');


module.exports = {
  getClothes: async (req, res) => {
    const temp = req.params.temp
    if (temp > 27) {
      const match = await clothes.findAll({
        attributes: ['cloth'],
        include : [{
          model: weather,
          where: {id: 1},
          attributes: []
        }]
      })
      const matchedClothed = match.map(el => el.cloth)
      res.status(201).send({
        "message": "ok",
        "data": {
          "cloth": matchedClothed
        }
      })
    }
    else {
      res.status(201).send('good')
    }

    
  }
}