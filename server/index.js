const app = require('./server');
const { syncAndSeed } = require('./db/syncAndSeed');

// const init = async () => {
//   try {
//     await syncAndSeed();
//     const PORT = process.env.PORT || 1234;
//     app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//   } catch (err) {
//     console.log(err);
//   }
// };

// init();

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
