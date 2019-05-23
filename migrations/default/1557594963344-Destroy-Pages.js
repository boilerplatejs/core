import {getModels} from '@boilerplatejs/core/lib/Sequelize';

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
      title: 'Login - BoilerplateJS™',
      sections: '["@boilerplatejs/core:Login"]'
    });

    await Page.create({
      route: 'dashboard',
      title: 'Account - BoilerplateJS™',
      sections: '["@boilerplatejs/core:Dashboard"]',
      auth: true
    });
  }
}
