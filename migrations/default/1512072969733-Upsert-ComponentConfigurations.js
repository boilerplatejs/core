import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    // await models.ComponentConfiguration.create({
    //   googleAnalyticsId: 'UA-108179013-1',
    //   googleAnalyticsDebug: true
    // });

    // await models.ComponentConfiguration.create({
    //   googleAnalyticsId: 'UA-103002973-1',
    //   googleAnalyticsDebug: false
    // });
  }

  static async down(models, sequelize, DataTypes) {
    // await models.ComponentConfiguration.destroy({
    //   where: {
    //     googleAnalyticsId: 'UA-108179013-1',
    //     googleAnalyticsDebug: true
    //   }
    // });

    // await models.ComponentConfiguration.destroy({
    //   where: {
    //     googleAnalyticsId: 'UA-103002973-1',
    //     googleAnalyticsDebug: false
    //   }
    // });
  }
}
