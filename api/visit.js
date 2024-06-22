const express = require('express');
const Visit = require('../models/Visit');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let visit = await Visit.findOne();
        if (!visit) {
            visit = new Visit();
        }
        visit.count += 1;
        await visit.save();
        res.json({ count: visit.count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
