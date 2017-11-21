import {parse, define, Model, DataTypes} from '@vitruvian-tech/app-studio-core/lib/Sequelize';
@define(parse(__filename))

export default class extends Model {

    // Attributes:

    /**
     * Example:
     *
     * `id = { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true };`
     * `name = DataTypes.STRING;`
     */

    // Descriptors:

    /**
     * Example:
     *
     * `static tableName = parse(__filename); // Use filename as the literal table name`
     */

};
