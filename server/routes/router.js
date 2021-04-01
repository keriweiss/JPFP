const { Campuses, Students } = require('../db/db');
const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/students', async (req, res, next) => {
  try {
    const page = req.query.page;
    const students = await Students.findAll();
    if (!page) {
      res.send(students);
    } else {
      const studentResult = students.slice((page - 1) * 10, page * 10);
      res.send({ students: studentResult, length: students.length });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/campuses', async (req, res, next) => {
  try {
    const page = req.query.page;
    const campuses = await Campuses.findAll({
      include: [Students],
    });
    const campusResult = campuses.slice((page - 1) * 10, page * 10);
    res.send(campusResult);
  } catch (err) {
    next(err);
  }
});

router.get('/students/:id', async (req, res, next) => {
  try {
    const student = await Students.findByPk(req.params.id, {
      include: [{ model: Campuses, required: false }],
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

router.post('/campuses', async (req, res, next) => {
  try {
    const { name, address, description } = req.body;
    res.send(
      await Campuses.create({
        name,
        address,
        description,
      })
    );
  } catch (err) {
    next(err);
  }
});

router.post('/students', async (req, res, next) => {
  try {
    const { firstName, lastName, email, gpa } = req.body;
    const campusId = req.body.campusId ? req.body.campusId : null;
    res.send(
      await Students.create({
        firstName,
        lastName,
        email,
        gpa,
        campusId,
      })
    );
  } catch (err) {
    next(err);
  }
});

router.delete('/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.delete('/students/:id', async (req, res, next) => {
  try {
    const student = await Students.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.put('/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campuses.findByPk(req.params.id);
    const { name, address, description } = req.body;
    await campus.update({ name, address, description });
    res.status(200).send(campus);
  } catch (err) {
    next(err);
  }
});

router.put('/students/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, email, gpa, campusId, campus } = req.body;
    const student = await Students.findByPk(req.params.id, {
      include: [Campuses],
    });
    console.log('first', student);
    await student.update({ firstName, lastName, email, gpa, campusId, campus });
    console.log(student);
    res.status(200).send(student);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
