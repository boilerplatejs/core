import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    await models.Environment.create({
      name: 'development',
      ComponentConfigurationId: 1
    });

    await models.Environment.create({
      name: 'production',
      ComponentConfigurationId: 2
    });
  }

  static async down(models, sequelize, DataTypes) {
    await models.Environment.destroy({
      where: {
        name: 'development',
        ComponentConfigurationId: 1
      }
    });

    await models.Environment.destroy({
      where: {
        name: 'production',
        ComponentConfigurationId: 2
      }
    });
  }
}
