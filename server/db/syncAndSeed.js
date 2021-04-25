const { db, Students, Campuses } = require('./db');
const { campuses } = require('./campuses');
const { getStudent } = require('./students');

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    //could also use Campuses.bulkCreate() and pass in the array of campuses directly
    await Promise.all(
      campuses.map(({ name, imageUrl, address, description }) =>
        Campuses.create({ name, imageUrl, address, description })
      )
    );
    const students = await getStudent();
    await Promise.all(
      students.map(({ firstName, lastName, imageUrl, email, gpa, campusId }) =>
        Students.create({ firstName, lastName, imageUrl, email, gpa, campusId })
      )
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = { syncAndSeed };
