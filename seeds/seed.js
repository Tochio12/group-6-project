const seedUsers = require('./userData');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USER SEEDED -----\n');

  process.exit(0);
};

seedAll();