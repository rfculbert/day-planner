const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password: "v2_3zDFA_ALZpZqsxvwgVqUVvpmfkXeU",
    port: 5432,
    host: "localhost",
    database: "dayplanner"
})

module.exports = pool;