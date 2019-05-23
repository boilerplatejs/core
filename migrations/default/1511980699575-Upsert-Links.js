import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    models = getModels();

    await models.Link.create({
      rel: 'shortcut icon',
      href: '/@boilerplatejs/core/images/favicon.png',
      sizes: '401x401'
    });
  }

  static async down(models, sequelize, DataTypes) {
    models = getModels();

    await models.Link.destroy({
      where: {
        rel: 'shortcut icon',
        href: '/@boilerplatejs/core/images/favicon.png',
        sizes: '401x401'
      }
    });
  }
}
