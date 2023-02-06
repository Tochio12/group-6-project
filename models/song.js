module.exports = function(sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1]
            }
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return Song;
}