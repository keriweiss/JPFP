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

router.get('/students/:id', async (req, res, next) => {
  try {
    const student = await Students.findByPk(req.params.id, {
      include: [Campuses],
    });
    res.send(student);
  } catch (err) {
    next(err);
  }
});

router.get('/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id, {
      include: [Students],
    });
    res.send(campus);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
