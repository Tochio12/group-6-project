const { Song} = require('../models');

const songData = [
  {
    name: 'Levitating',
    type: 'Pop',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
  {
    name: 'Save Your Tears',
    type: 'R&B',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
  {
    name: 'Stay',
    type: 'Slow Pop',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
 
];

const seedSong = () => Song.bulkCreate(songData);

module.exports = seedSong;