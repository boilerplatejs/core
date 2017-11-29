import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.create({
      route: '*',
      title: 'VitruvianTech - Error',
      sections: '["@machete-platform/core-bundle:Error"]',
      status: 404
    });

    await Page.create({
      route: 'login',
      title: 'VitruvianTech - Login',
      sections: '["@machete-platform/core-bundle:Login"]'
    });

    await Page.create({
      route: 'dashboard',
      title: 'VitruvianTech - Dashboard',
      sections: '["@machete-platform/core-bundle:Dashboard"]',
      auth: true
    });
  }

  static async down(models, sequelize, DataTypes) {
    const {Page} = getModels();

    await Page.destroy({
      where: {
        route: '*',
        title: 'VitruvianTech - Error',
        sections: '["@machete-platform/core-bundle:Error"]',
        status: 404
      }
    });

    await Page.destroy({
      where: {
        route: 'login',
        title: 'VitruvianTech - Login',
        sections: '["@machete-platform/core-bundle:Login"]'
      }
    });

    await Page.destroy({
      where: {
        route: 'dashboard',
        title: 'VitruvianTech - Dashboard',
        sections: '["@machete-platform/core-bundle:Dashboard"]',
        auth: true
      }
    });
  }
}
