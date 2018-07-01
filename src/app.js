const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mysql = require('mysql')
const crypto = require('crypto');
const config = require('../config/config');
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('combined'))


// connection.connect((err) => {
// 	if (err) throw err
//
// 	connection.query(`USE ${req.query.faculty};`, (err) => {
// 		if (err) throw err
// 	})
//
// 	connection.query(`SELECT ${req.query.weekdays} FROM ${req.query.group};`, (err, result) => {
// 		if (err) throw err
// 		res.json(result)
// 	})
// })

app.post('/addGroup', (req, res) => {
})

app.post('/editGroup', (req, res) => {
})

app.delete('/deleteGroup', (req, res) => {
})

app.get('/showGroup', (req, res) => {
	res.send({
		message: `Hi there! group is: ${req.query.group}.`
	});
})

app.post('/login', (req, res) => {
	//encrypt password in sha256;
	let passwordEncrypted = crypto.createHash("sha256").update(req.body.password).digest("hex");

	//TODO: get encrypted password from db;
	let loginConnection = mysql.createConnection({
		host:config.host_DB,
		user:config.user_DB_Login,
		password:config.password_DB_Login
	});
	loginConnection.connect((err) => {
		if (err) throw err
		loginConnection.query(`USE SyllabusPanel_U;`, (err) => {
			if (err) throw err
		})
		loginConnection.query(`SELECT password FROM users WHERE username='${req.body.username}';`, (err, result) => {
			if (err) throw err
			//res.json(result)
			let passwordFromDB = result[0].password;
			switch (req.body.username) {
				case 'NNIEP':case 'NNIIM':case 'NNIIOT':case 'NNIIF':
				case 'NNIPOSRM':case 'NNIPN':case 'NNIUFSK':case 'NNIFKSZ':
				case 'FPSY':case 'FOTIUS':case 'NNCIMO':case 'IDPPO':
				(req.body.password === passwordFromDB) ? res.status(202).send() : res.status(401).send();break;
			}
		})
	})
})

app.listen(config.port || 4080, () => console.log('App is listening on port ' + config.port + '!'))
