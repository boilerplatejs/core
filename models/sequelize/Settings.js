export default (sequelize, DataTypes) => sequelize.define('Settings', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
});
