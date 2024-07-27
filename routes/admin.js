const express = require('express');
const PC = require('../models/pc');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin');

router.get('/admin', isAuthenticated, isAdmin, async (req, res) => {
    const pcs = await PC.findAll();
    res.render('admin', { pcs, user: req.session.user });
});

router.post('/admin/add-pc', isAuthenticated, isAdmin, async (req, res) => {
    const { name, status } = req.body;
    await PC.create({ name, status, bookedUntil: null });
    res.redirect('/admin');
});

module.exports = router;
