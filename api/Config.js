import async from '@machete-platform/core-bundle/lib/Promise';
import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';
import config from '../../../../config';

export const layout = async(async (req, params, resolve, reject) => {
    const { app, pages, theme } = config;

    if (__DEVELOPMENT__) {
        console.log('Layout', await getModels().Layout.findAll({ limit: 1, order: [['id', 'DESC']] }).then(records => records[0].dataValues));
        console.log('MetaTags', await getModels().MetaTag.findAll().then(records => records.map(record => record.dataValues)));
        console.log('Links', await getModels().Link.findAll().then(records => records.map(record => record.dataValues)));
        console.log('Scripts', await getModels().Script.findAll().then(records => records.map(record => record.dataValues)));
        console.log('Pages', await getModels().Page.findAll({ order: [['route', 'DESC']] }).then(records => records.map(record => record.dataValues)));
    }

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
