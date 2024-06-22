var express = require('express');
var router = express.Router();
const Click = require('../models/click');

/* GET clicks count */
router.get('/', async function(req, res, next) {
  try {
    const clickData = await Click.findOne({});
    if (clickData) {
      res.json({ clicks: clickData.clicks });
    } else {
      const newClick = new Click();
      await newClick.save();
      res.json({ clicks: newClick.clicks });
    }
  } catch (error) {
    console.error('Error fetching click data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
