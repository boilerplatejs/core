import {parse, define, Model, DataTypes} from '@vitruvian-tech/app-studio-core/lib/Sequelize';
@define(parse(__filename))

/**
 * Table Definition
 *
 * @see http://docs.sequelizejs.com/manual/tutorial/models-definition.html
 */
export default class extends Model {
    /**
     * Attributes
     *
     * @see http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types
     *
     * Examples:
     *
     * id = { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true };
     * name = DataTypes.STRING;
     */

    /**
     * Descriptors
     *
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
