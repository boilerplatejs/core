import DataTypes from 'sequelize';
import {Model, define} from '@vitruvian-tech/app-studio-core/helpers/sequelize/Connection';

export default define(class Settings extends Model {
  id = {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  };
});
