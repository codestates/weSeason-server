const express = require('express')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routerIdx = require('./router/index');
const app = express()

app.use(cors({
  origin: ["https://www.weseason4.com"],
  credentials: true,
}));
// app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/', routerIdx);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// const fs = require("fs");
// const https = require('https')
// const privateKey = fs.readFileSync('./key.pem', "utf8");
// const certificate = fs.readFileSync('./cert.pem', "utf8");
// const credentials = { key: privateKey, cert: certificate };

// const HTTPS_PORT = process.env.HTTPS_PORT || 3001;
// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(HTTPS_PORT, () => console.log("server runnning"));

// module.exports = httpsServer;

// ----->배포시 서버셋팅
const port = 3001;

app.listen(3001, () => {
  console.log(`server listening on ${port}`);
})

module.exports = app;