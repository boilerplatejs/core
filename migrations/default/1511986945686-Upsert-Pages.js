import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: '*',
      title: 'We\'re Sorry! - BoilerplateJS™',
      sections: '["@boilerplatejs/core:Error"]',
      status: 404
    });

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

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: '*',
        title: 'We\'re Sorry! - BoilerplateJS™',
        sections: '["@boilerplatejs/core:Error"]',
        status: 404
      }
    });

    await Page.destroy({
      where: {
        route: 'login',
        title: 'Login - BoilerplateJS™',
        sections: '["@boilerplatejs/core:Login"]'
      }
    });

    await Page.destroy({
      where: {
        route: 'dashboard',
        title: 'Account - BoilerplateJS™',
        sections: '["@boilerplatejs/core:Dashboard"]',
        auth: true
      }
    });
  }
}
