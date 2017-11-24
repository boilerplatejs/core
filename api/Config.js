import async from '@vitruvian-tech/app-studio-core/lib/Promise';
import config from '../../../../config';

export const layout = async((req, params, resolve, reject) => {
    const { app, pages, theme } = config;
    resolve({ app, pages, theme });
});

export const components = async((req, params, resolve, reject) => {
    resolve(config[req.query.bundle].components || {});
});

export const api = async((req, params, resolve, reject) => {
    if (req.headers.host.split(':')[0].toLowerCase() === 'localhost') {
        resolve(config[req.query.bundle].api || {});
    } else {
        const error = new Error('Unauthorized');
        error.status = 403;
        reject(error);
    }
});