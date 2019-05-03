import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    models = getModels();

    await models.Link.create({
      rel: 'shortcut icon',
      href: '/@machete-platform/core-bundle/images/favicon.png',
      sizes: '401x401'
    });
  }

  static async down(models, sequelize, DataTypes) {
    models = getModels();

    await models.Link.destroy({
      where: {
        rel: 'shortcut icon',
        href: '/@machete-platform/core-bundle/images/favicon.png',
        sizes: '401x401'
      }
    });
  }
}
