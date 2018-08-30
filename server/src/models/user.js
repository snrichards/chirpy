const bcrypt = require('bcrypt');

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 7,
      },
    },
  });

  User.associate = (models) => User.hasMany(models.Chirp);

  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    return bcrypt.hash(this.password, 10);
  };

  User.beforeCreate(async (newUser) => {
    newUser.password = await newUser.generatePasswordHash();
  });

  return User;
};

module.exports = user;
