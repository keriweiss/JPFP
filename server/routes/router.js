const { Campuses, Students } = require('../db/db');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/students', async (req, res, next) => {
  try {
    res.send(await Students.findAll());
  } catch (err) {
    next(err);
  }
});

router.get('/campuses', async (req, res, next) => {
  try {
    res.send(await Campuses.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
