const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize('Pc_booking_site', 'Admin', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
