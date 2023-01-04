const fs = require('fs');

fs.writeFile('./.env', `API=${process.env.API}\n`, (err) => { console.log(err) });