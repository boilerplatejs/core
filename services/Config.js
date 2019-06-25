import async from '@boilerplatejs/core/lib/Promise';
import {getModels} from '@boilerplatejs/core/lib/Sequelize';
import _ from 'lodash';

const PAGE_JSON_KEYS = ['headers', 'sections', 'meta', 'links', 'scripts', 'options'];
const LAYOUT_JSON_KEYS = ['headers', 'sections', 'options'];

const cache = { environment: {} };

const getValues = records => records.map(record => record.dataValues);

const parse = (object, keys) => {
    keys.forEach(key => {
        if(object[key] === null) {
            delete object[key];
        } else {
            try {
                object[key] = JSON.parse(object[key]);

                if(['scripts', 'links'].indexOf(key) > -1) {
                    object[key.replace(/s$/, '')] = object[key];
                    delete object[key];
                }
            } catch (e) {
                console.error(e);
            }
        }
    });

    return object;
};

const getSessionConfig = async () => {
    const {Layout, Session} = getModels();

    const LayoutId = await Layout.findAll({ where: { enabled: true }, limit: 1, order: [['id', 'DESC']] })
        .then(getValues)
        .then(records => records[0].id);

    return await Session.findAll({ where: { LayoutId } })
        .then(getValues)
        .then(records => records.map(record => record.service));
};

const getLayoutConfig = async () => {
    const parsePage = page => parse(page, PAGE_JSON_KEYS);
    const parseLayout = layout => parse(layout, LAYOUT_JSON_KEYS);
    const {Layout, MetaTag, Link, Script, Page} = getModels();

    const {app, theme, title, page, headers, sections, options, auth} = await Layout.findAll({ where: { enabled: true }, limit: 1, order: [['id', 'DESC']] })
        .then(getValues)
        .then(records => records[0]);

    const meta = await MetaTag.findAll()
        .then(getValues)
        .then(metatags => metatags.map(({ key, value, content }) => ({ [key]: value, content })))
        .then(metatags => metatags.map(metatag => metatag.content ? metatag : _.unset(metatag, 'content') && metatag));

    const link = await Link.findAll()
        .then(getValues)
        .then(links => links.map(({ rel, href, sizes }) => ({ rel, href, sizes })))
        .then(links => links.map(link => link.sizes ? link : _.unset(link, 'sizes') && link));

    const script = await Script.findAll()
        .then(getValues)
        .then(scripts => scripts.map(({ type, external, content }) => ({ type, [external ? 'src' : 'innerHTML']: content })));

    const pages = await Page.findAll({ order: [['route', 'DESC']] })
        .then(getValues)
        .then(pages => pages.map(parsePage))
        .then(pages => _.keyBy(pages, 'route'))
        .then(pages => Object.assign(pages, { '$': parseLayout({ title, page, meta, link, script, headers, sections, options }) }));

    return { app, theme, title, pages, auth };
};

const getEnvironmentConfig = async (bundle, configuration, name = __CONFIG__ || __ENV__) => {
    const models = getModels(bundle);
    const {Environment} = models;

    return (cache.environment[bundle] = cache.environment[bundle] || await Environment.findOne({
        where: { name },
        include: [{
            model: models[configuration],
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] }
        }]
    })
        .then(environment => {
            if (environment || name === __ENV__) {
                return environment ? environment[configuration] || {} : {};
            } else {
                throw new Error(`Environment '${name}' does not exist.`);
            }
        })
        .then(configuration => configuration.dataValues || {})
        .catch(e => {
            if (__CONFIG__ && name === __CONFIG__) return getEnvironmentConfig(bundle, configuration, __ENV__);
            else {
                console.error(e);
                return {};
            }
        }));
};

export const session = async(async (req, params, resolve, reject) => {
    resolve((cache.session = cache.session || await getSessionConfig()));
});

export const layout = async(async (req, params, resolve, reject) => {
    resolve((cache.layout = cache.layout || await getLayoutConfig()));
});

export const components = async(async (req, params, resolve, reject) => {
    resolve(await getEnvironmentConfig(req.query.bundle, 'ComponentConfiguration'));
});

export const service = async(async (req, params, resolve, reject) => {
    if (req.headers.host.split(':')[0].toLowerCase() === 'localhost') {
        resolve(await getEnvironmentConfig(req.query.bundle, 'ServiceConfiguration'));
    } else {
        const error = new Error('Unauthorized');
        error.status = 403;
        reject(error);
    }
});

export const refresh = async(async (req, params, resolve, reject) => {
    delete cache.layout;
    delete cache.session;
    cache.environment = {};
    resolve({});
});

export const services = service;
