export default class {
  static async up(models, sequelize, DataTypes) {
    try {
      await sequelize.queryInterface.addColumn(
        'ComponentConfigurations',
        'auth0Domain',
        {type: DataTypes.STRING}
      );

      await sequelize.queryInterface.addColumn(
        'ComponentConfigurations',
        'auth0ClientId',
        {type: DataTypes.STRING}
      );
    } catch (e) {
      if (e.parent.code !== 'ER_DUP_FIELDNAME') {
        throw e;
      }
    }
  }

  static async down(models, sequelize, DataTypes) {
    await sequelize.queryInterface.removeColumn(
      'ComponentConfigurations',
      'auth0Domain'
    );

    await sequelize.queryInterface.removeColumn(
      'ComponentConfigurations',
      'auth0ClientId'
    );
  }
}
