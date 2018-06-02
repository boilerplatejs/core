import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';

export default class {
  static async up(models, sequelize, DataTypes) {
    try {
      await sequelize.queryInterface.addColumn(
        'Contacts',
        'quote',
        {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
      );

      await sequelize.queryInterface.addColumn(
        'Contacts',
        'newsletter',
        {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
      );

      await sequelize.queryInterface.addColumn(
        'Contacts',
        'comment',
        {type: DataTypes.TEXT, allowNull: true}
      );
    } catch (e) {
      if (e.parent.code !== 'ER_DUP_FIELDNAME') {
        throw e;
      }
    }
  }

  static async down(models, sequelize, DataTypes) {
    await sequelize.queryInterface.removeColumn(
      'Contacts',
      'quote'
    );

    await sequelize.queryInterface.removeColumn(
      'Contacts',
      'newsletter'
    );

    await sequelize.queryInterface.removeColumn(
      'Contacts',
      'comment'
    );
  }
}
