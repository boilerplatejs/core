export default class {
  static async up(models, sequelize, DataTypes) {
    try {
      await sequelize.queryInterface.addColumn(
        'ComponentConfigurations',
        'recaptchaSiteKey',
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
      'recaptchaSiteKey'
    );
  }
}
