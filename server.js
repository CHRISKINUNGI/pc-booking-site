const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sequelize = require('./config/database');
const User = require('./models/user');
const PC = require('./models/pc');
const authRoutes = require('./routes/auth');
const pcsRoutes = require('./routes/pcs');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use(authRoutes);
app.use(pcsRoutes);
app.use(adminRoutes);
app.use(profileRoutes);

// Sync models and start server
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
