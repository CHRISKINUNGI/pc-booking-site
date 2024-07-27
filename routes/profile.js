const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/user');

// Profile Page
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user.id);
        res.render('profile', {
            user,
            message: req.query.message || null, // Ensure message is defined
            error: req.query.error || null // Ensure error is defined
        });
    } catch (error) {
        console.error(error);
        res.redirect('/pcs?error=Could not load profile');
    }
});

// Update Profile
router.post('/profile', isAuthenticated, async (req, res) => {
    const { username, email } = req.body;
    try {
        await User.update(
            { username, email },
            { where: { id: req.session.user.id } }
        );
        req.session.user.username = username;
        res.redirect('/profile?message=Profile updated successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/profile?error=Could not update profile');
    }
});

module.exports = router;
