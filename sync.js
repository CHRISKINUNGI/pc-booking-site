const sequelize = require('./config/database');
const PC = require('./models/pc');
const User = require('./models/user'); // Make sure you have user model as well

(async () => {
    try {
        // Sync models
        await sequelize.sync({ force: true }); // This will drop and recreate tables
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
})();
