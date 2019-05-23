import {getModels} from '@boilerplatejs/core/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    // await models.ComponentConfiguration.create({
    //   googleAnalyticsId: '<DEV_ID>',
    //   googleAnalyticsDebug: true
    // });

    // await models.ComponentConfiguration.create({
    //   googleAnalyticsId: '<PROD_ID>',
    //   googleAnalyticsDebug: false
    // });
  }

  static async down(models, sequelize, DataTypes) {
    // await models.ComponentConfiguration.destroy({
    //   where: {
    //     googleAnalyticsId: '<DEV_ID>',
    //     googleAnalyticsDebug: true
    //   }
    // });

    // await models.ComponentConfiguration.destroy({
    //   where: {
    //     googleAnalyticsId: '<PROD_ID>',
    //     googleAnalyticsDebug: false
    //   }
    // });
  }
}
