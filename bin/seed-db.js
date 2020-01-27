const fs = require('fs')

fs.copyFileSync(
  `${__dirname}/dummy-data.json`,
  `${__dirname}/../storage/data.json`
)