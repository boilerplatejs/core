import async from '@vitruvian-tech/app-studio-core/helpers/Promise';
import config from '../../../../../config';

export const environment = async((req, params, resolve, reject) => {
    resolve(config.environment);
});

export const layout = async((req, params, resolve, reject) => {
    resolve(config.layout);
});

export const components = async((req, params, resolve, reject) => {
    resolve(config.settings[req.query.bundle].components || {});
});

export const api = async((req, params, resolve, reject) => {
    if (req.headers.host.split(':')[0].toLowerCase() === 'localhost') {
        resolve(config.settings[req.query.bundle].api || {});
    } else {
        const error = new Error('Unauthorized.');
        error.status = 403;
        reject(error);
    }
});
