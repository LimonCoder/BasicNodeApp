const mysql = require('mysql');
let db = {};
// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});


// Function to execute a query
function executeQuery(query, params = []) {
    return new Promise((resolve,reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(query, params, (err, results) => {
                connection.release(); // Release the connection back to the pool
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    })


}

module.exports = {
    executeQuery
};
