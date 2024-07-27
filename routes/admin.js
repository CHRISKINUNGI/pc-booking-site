const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const User = require('../models/user');
const PC = require('../models/pc');

// Admin Dashboard
router.get('/admin', isAuthenticated, async (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.redirect('/pcs');
    }

    try {
        const users = await User.findAll();
        const pcs = await PC.findAll();
        res.render('admin/dashboard', {
            users,
            pcs,
            user: req.session.user,
            message: req.query.message || '',
            error: req.query.error || ''
        });
    } catch (error) {
        console.error(error);
        res.redirect('/pcs?error=Could not load admin dashboard');
    }
});

// Add PC
router.post('/admin/add-pc', isAuthenticated, async (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.redirect('/pcs');
    }

    const { name, status } = req.body;

    try {
        await PC.create({ name, status: status || 'available' });
        res.redirect('/admin?message=PC added successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/admin?error=Could not add PC');
    }
});

// Remove PC
router.post('/admin/remove-pc', isAuthenticated, async (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.redirect('/pcs');
    }

    const { pcId } = req.body;

    try {
        await PC.destroy({ where: { id: pcId } });
        res.redirect('/admin?message=PC removed successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/admin?error=Could not remove PC');
    }
});

// Delete User Account
router.post('/admin/delete-user', isAuthenticated, async (req, res) => {
    if (req.session.user.role !== 'admin') {
        return res.redirect('/pcs');
    }

    const { userId } = req.body;

    try {
        await User.destroy({ where: { id: userId } });
        res.redirect('/admin?message=User account deleted successfully');
    } catch (error) {
        console.error(error);
        res.redirect('/admin?error=Could not delete user account');
    }
});

module.exports = router;
