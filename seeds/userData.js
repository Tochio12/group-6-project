const sequelize = require('../config/connection');
const { User} = require('../models');

const userdata = [
  {
    username: 'Banana',
    email: 'user@email.com',
    password: 'password',
  }

]


  const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;