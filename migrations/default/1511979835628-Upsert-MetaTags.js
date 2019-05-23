import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    models = getModels();

    await models.MetaTag.create({
      key: 'charset',
      value: 'utf-8'
    });

    await models.MetaTag.create({
      key: 'name',
      value: 'viewport',
      content: 'width=device-width, initial-scale=1'
    });
  }

  static async down(models, sequelize, DataTypes) {
    models = getModels();

    await models.MetaTag.destroy({
      where: {
        key: 'charset',
        value: 'utf-8'
      }
    });

    await models.MetaTag.destroy({
      where: {
        key: 'name',
        value: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    });
  }
}
