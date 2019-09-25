module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      idTokens: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      token: DataTypes.STRING,
      hores: DataTypes.INTEGER,
      iduser: DataTypes.INTEGER,
      nombre: DataTypes.STRING
    },
    { tableName: 'tokens' }
  );

  return Token;
};
