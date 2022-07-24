const https = require(`https`);
const fs = require(`fs`);

const options = {    cert: fs.readFileSync('./ssl/cert.pem'),
key: fs.readFileSync('./ssl/key.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end(`hello world\n`);
}).listen(8000);