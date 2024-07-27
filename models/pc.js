const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct

const PC = sequelize.define('PC', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('available', 'booked'),
        defaultValue: 'available'
    },
    bookedUntil: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = PC;
