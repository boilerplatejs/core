import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: 'login'
      }
    });

    await Page.destroy({
      where: {
        route: 'dashboard'
      }
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: 'login',
      title: 'Login - Machete™',
      sections: '["@machete-platform/core-bundle:Login"]'
    });

    await Page.create({
      route: 'dashboard',
      title: 'Account - Machete™',
      sections: '["@machete-platform/core-bundle:Dashboard"]',
      auth: true
    });
  }
}
