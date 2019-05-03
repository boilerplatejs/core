import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: '*',
      title: 'We\'re Sorry! - Machete™',
      sections: '["@machete-platform/core-bundle:Error"]',
      status: 404
    });

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

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: '*',
        title: 'We\'re Sorry! - Machete™',
        sections: '["@machete-platform/core-bundle:Error"]',
        status: 404
      }
    });

    await Page.destroy({
      where: {
        route: 'login',
        title: 'Login - Machete™',
        sections: '["@machete-platform/core-bundle:Login"]'
      }
    });

    await Page.destroy({
      where: {
        route: 'dashboard',
        title: 'Account - Machete™',
        sections: '["@machete-platform/core-bundle:Dashboard"]',
        auth: true
      }
    });
  }
}
