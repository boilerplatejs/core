import {parse, define, Model, DataTypes} from '@boilerplatejs/core/lib/Sequelize';
@define(parse(__filename))

/**
 * Table Definition
 *
 * @see http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types
 */
export default class extends Model {
    /**
     * Attributes
     *
     * Examples:
     *
     * id = { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true };
     * name = DataTypes.STRING;
     */
    email = { type: DataTypes.STRING, allowNull: false, primaryKey: true };
    firstName = DataTypes.STRING;
    lastName = DataTypes.STRING;
    quote = { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false };
    newsletter = { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false };
    comment = { type: DataTypes.TEXT, allowNull: true };

    /**
     * Descriptors
     *
     * @see http://docs.sequelizejs.com/manual/tutorial/models-definition.html
     * @see http://docs.sequelizejs.com/manual/tutorial/associations.html
     *
     * Examples:
     *
     * static associate = function(models) {
     *     this.belongsTo(models.ApiConfiguration); // Creates an `ApiConfigurationId` column/foreign key
     *     this.belongsTo(models.ComponentConfiguration); // Creates a `ComponentConfigurationId` column/foreign key
     * };
     *
     * static tableName = parse(__filename); // Use filename as the literal table name
     */
}
