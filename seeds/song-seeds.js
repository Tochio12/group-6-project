const { Song} = require('../models');

const songData = [
  {
    name: 'Levitating',
    type: 'Pop',
    created_at: new Date(),
  },
  {
    name: 'Save Your Tears',
    type: 'R&B',
    created_at: new Date(),
  },
  {
    name: 'Stay',
    type: 'Slow Pop',
    created_at: new Date(),
  },
 
];

const seedSong = () => Song.bulkCreate(songData);

module.exports = seedSong;