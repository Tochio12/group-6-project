//Model for saved/bookmarked songs
module.exports = function(sequelize, DataTypes) {
    var savedSongs = sequelize.define("savedSongs", {
        songName: DataTypes.STRING,
        artistName: DataTypes.STRING,
    });
    return savedSongs;
}