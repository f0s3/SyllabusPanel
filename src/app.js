const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mysql = require('mysql')
const app = express()
const port = 4080

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/', (req, res) => {
	res.send({message: "Hello world!"})
})

app.listen(port, () => console.log('App is listening on port ' + port + '!'))