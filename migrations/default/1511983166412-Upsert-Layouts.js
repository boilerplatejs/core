import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    // models = getModels();
    //
    // return await models.Layout.create({
    //   title: 'Machete',
    //   theme: '@machete-platform/core-bundle',
    //   app: '@machete-platform/core-bundle:App',
    //   page: '@machete-platform/core-bundle:Page'
    // });
  }

  static async down(models, sequelize, DataTypes) {
    // models = getModels();
    //
    // return await models.Layout.destroy({
    //   where: {
    //     title: 'Machete',
    //     theme: '@machete-platform/core-bundle',
    //     app: '@machete-platform/core-bundle:App',
    //     page: '@machete-platform/core-bundle:Page'
    //   }
    // });
  }
}
