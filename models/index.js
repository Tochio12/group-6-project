const User = require('./User');
const Song = require('./Song');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Song, {
    foreignKey: 'user_id'
});

Song.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Song, {
    through: Vote,
    as: 'voted_song',
    foreignKey: 'user_id'
});

Song.belongsToMany(User, {
    through: Song,
    as: 'voted_song',
    foreignKey: 'song_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Song, {
    foreignKey: 'song_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Song.hasMany(Vote, {
    foreignKey: 'Song_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Song, {
    foreignKey: 'song_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Song.hasMany(Comment, {
    foreignKey: 'song_id'
});

module.exports = {User, Song, Vote, Comment};