const seedSong = require('./song-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedSong();
  console.log('\n----- SONG SEEDED -----\n');

  process.exit(0);
};

seedAll();