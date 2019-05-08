import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    models = getModels();
    
    return await models.Layout.create({
      title: 'Machete™ Theme Platform',
      theme: '@machete-platform/core-bundle',
      app: '@machete-platform/core-bundle:App',
      page: '@machete-platform/core-bundle:Page',
      fallbackExpression: 'MSIE (?:[0-9]|10).\\d',
      enabled: true
    });
  }

  static async down(models, sequelize, DataTypes) {
    models = getModels();
    
    return await models.Layout.destroy({
      where: {
        title: 'Machete™ Theme Platform',
        theme: '@machete-platform/core-bundle',
        app: '@machete-platform/core-bundle:App',
        page: '@machete-platform/core-bundle:Page',
        fallbackExpression: 'MSIE (?:[0-9]|10).\\d',
        enabled: true
      }
    });
  }
}
