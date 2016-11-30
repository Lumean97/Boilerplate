const express = require('express')
const fs      = require('fs')

const app     = express()

app.get('/', function (req, res) {
  fs.readFile('tasks.json', 'utf-8', (err, data) => {

    if (err) throw err

    fs.writeFile('out.json', data, (err) => {
      if (err) throw err
    })
    
    res.send(data.toString('utf-8'))
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
