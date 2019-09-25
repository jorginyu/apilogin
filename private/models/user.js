'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      foto: DataTypes.STRING,
      tel: DataTypes.STRING,
      direccion: DataTypes.STRING,
      facebook: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
      instagram: DataTypes.STRING,
      skype: DataTypes.STRING,
      disponibilidad: DataTypes.STRING,
      tipo: DataTypes.INTEGER
    },
    { tableName: 'usuario', timestamps: false }
  );

  return User;
};
