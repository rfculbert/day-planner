const Sequelize = require ('sequelize');

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

const sequelize = new Sequelize('postgresql://rfculbert:v2_3zEad_a9LF3LVYLkLiRqaWJQEKsdJ@db.bit.io:5432/rfculbert/day-planner?sslmode=require')

const testDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established');
    } catch (error) {
        console.error('Unable to connect', error)
    }
}
testDb()

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
 })
 app.get('/Users', (req, res) => {
    sequelize.query('select * from Users;').then(dbRes => res.send(dbRes))
 })

