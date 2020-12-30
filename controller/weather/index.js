module.exports = {
  getWeathers: (req, res) => {
    console.log(req.query);
    res.status(200).json({
      message: 'TAST TAST'
    })
  }
}