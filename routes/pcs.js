const express = require('express');
const { Sequelize, Op } = require('sequelize'); // Import Sequelize and Op
const PC = require('../models/pc');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/pcs', isAuthenticated, async (req, res) => {
    const now = new Date();
    let availablePCs = await PC.findAll({
        where: {
            [Op.or]: [ // Use Op from Sequelize
                { status: 'available' },
                { bookedUntil: { [Op.lte]: now } }
            ]
        }
    });

    let bookedPCs = await PC.findAll({
        where: {
            status: 'booked',
            bookedUntil: { [Op.gt]: now }
        }
    });

    availablePCs = await Promise.all(availablePCs.map(async (pc) => {
        if (pc.bookedUntil && new Date(pc.bookedUntil) <= now) {
            pc.status = 'available';
            pc.bookedUntil = null;
            await pc.save(); // Ensure save() is awaited
        }
        return pc;
    }));

    res.render('pcs', { availablePCs, bookedPCs, user: req.session.user });
});

router.post('/book', isAuthenticated, async (req, res) => {
    const { pcIndex, bookingTime } = req.body;
    const bookingDuration = parseInt(bookingTime);
    const now = new Date();
    const bookedUntil = new Date(now.getTime() + bookingDuration * 60000);

    const pcs = await PC.findAll();
    const pc = pcs[pcIndex];
    if (pc) {
        pc.status = 'booked';
        pc.bookedUntil = bookedUntil;
        await pc.save(); // Ensure save() is awaited
    }
    res.redirect('/pcs');
});

module.exports = router;
