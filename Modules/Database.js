const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

// Function to execute a query
function executeQuery(query, params, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null);
            return;
        }
        connection.query(query, params, (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    });
}

module.exports = {
    executeQuery
};
