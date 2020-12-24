const express = require('express')
const app = express()
const fs = require("fs");
const https = require('https')
const privateKey = fs.readFileSync('./key.pem', "utf8");
const certificate = fs.readFileSync('./cert.pem', "utf8");
const credentials = { key: privateKey, cert: certificate };
const routerIdx = require('./router/index');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/', routerIdx);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const HTTPS_PORT = process.env.HTTPS_PORT || 3001;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, () => console.log("server runnning"));

module.exports = httpsServer;