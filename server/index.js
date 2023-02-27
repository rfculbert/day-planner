const Sequelize = require ('sequelize');

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();
const pool = require("./db");

const sequelize = new Sequelize('postgresql://rfculbert:v2_3zEad_a9LF3LVYLkLiRqaWJQEKsdJ@db.bit.io:5432/rfculbert/day-planner?sslmode=require')

//middleware
app.use(cors());
app.use(express.json()) // gives access to req.body

//Routes
app.post("/api/register",async (req, res)=> {
    console.log("register", req.body)
    const users = await sequelize.query(`SELECT * FROM users WHERE username = '${req.body.username}'`)
    console.log(users)
    if (users[0].length === 0) {
        const newUsers = await sequelize.query(`INSERT INTO users(username, password) VALUES('${req.body.username}', '${req.body.pass}')`)
        res.status(200).send(newUsers[0][0])
    } else (res.status(409).send("User Already Exists"))
})
app.post("/api/login", async (req, res) => {
    console.log("login", req.body)
    const users = await sequelize.query(`SELECT * FROM users WHERE username = '${req.body.username}' AND password='${req.body.pass}'`)
    console.log(users)
    if (users[0].length === 0) {
        res.status(409).send("Log-in failed")
    } else (res.status(200).send({...users[0][0], password:undefined}))
})

app.get("/api/events/:id", async (req, res) => {
    const events = await sequelize.query(`select * from events where user_id = '${req.params.id}'`)
    res.status(200).send(events[0])
})
app.post("/api/events", async (req, res) => {
    await sequelize.query(`insert into events (user_id, start_date, end_date, title) values('${req.body.userId}', '${req.body.start}', '${req.body.end}', '${req.body.title}')`)
    const events = await sequelize.query(`select * from events where user_id = '${req.body.userId}'`)
    res.status(200).send(events[0])
})

//params => http://localhost:5000/:id => req.params
//query parameters => hhtp://localhost:5000/?name=henry = req.query

app.get("/users", async (req, res) => { 
    try{
        const {name} = req.query;


        const users = await pool.query("SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1", [`%${name}%`])

        res.json(users.rows);
        res.json(req.query); 
    }catch (err) {
        console.log(err.message)
    }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
 })
 app.get('/Users', (req, res) => {
    sequelize.query('select * from Users;').then(dbRes => res.send(dbRes))
 })

