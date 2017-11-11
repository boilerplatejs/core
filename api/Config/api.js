import async from '@vitruvian-tech/app-studio-core/helpers/Promise';
import config from '../../../../../config';

export default async((req, params, resolve, reject) => {
  resolve(config.settings[req.query.bundle].api || {});
});
