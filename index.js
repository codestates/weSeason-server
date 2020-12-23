const express = require('express')
const app = express()
const fs = require("fs");
// const authRouter = require('./router/auth')
// const clothesRouter = require('./router/clothes')
// const usersRouter = require('./router/users')
// const weatherRouter = require('./router/weather')
const https = require('https')
const privateKey = fs.readFileSync('./key.pem', "utf8");
const certificate = fs.readFileSync('./cert.pem', "utf8");
const credentials = { key: privateKey, cert: certificate };

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/auth', authRouter)
// app.use('/clothes', clothesRouter)
// app.use('/users', usersRouter)
// app.use('/weather', weatherRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const HTTPS_PORT = process.env.HTTPS_PORT || 3001;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, () => console.log("server runnning"));

module.exports = httpsServer;