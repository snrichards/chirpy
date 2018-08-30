const chirp = (sequelize, DataTypes) => {
  const Chirp = sequelize.define('chirp', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        max: 75,
      },
    },
  });

  Chirp.associate = (models) => Chirp.belongsTo(models.User);

  return Chirp;
};

module.exports = chirp;
