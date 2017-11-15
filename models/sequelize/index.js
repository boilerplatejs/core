import {name as bundle} from '../../package.json';
import {getModels} from '@vitruvian-tech/app-studio-core/helpers/sequelize/Connection';
export default getModels(bundle);
