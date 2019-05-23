import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    models = getModels();
    
    return await models.Layout.create({
      title: 'BoilerplateJS™ - App Development Platform',
      theme: '@boilerplatejs/core',
      app: '@boilerplatejs/core:App',
      page: '@boilerplatejs/core:Page',
      fallbackExpression: 'MSIE (?:[0-9]|10).\\d',
      enabled: true
    });
  }

  static async down(models, sequelize, DataTypes) {
    models = getModels();
    
    return await models.Layout.destroy({
      where: {
        title: 'BoilerplateJS™ - App Development Platform'
      }
    });
  }
}
