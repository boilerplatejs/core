import async from '@machete-platform/core-bundle/lib/Promise';
import {getModels} from '@machete-platform/core-bundle/lib/Sequelize';
import _ from 'lodash';
import config from '../../../../config';

const PAGE_JSON_KEYS = ['headers', 'sections', 'meta', 'links', 'scripts'];
const LAYOUT_JSON_KEYS = ['headers', 'sections', 'options'];

const getValues = records => records.map(record => record.dataValues);

const parse = (object, keys) => {
    keys.forEach(key => {
        if(object[key] === null) {
            delete object[key];
        } else {
            try {
                object[key] = JSON.parse(object[key]);
            } catch (e) {
                console.error(e);
            }
        }
    });

    return object;
};

const parsePage = page => parse(page, PAGE_JSON_KEYS);

const parseLayout = layout => parse(layout, LAYOUT_JSON_KEYS);

const getLayoutConfig = async () => {
    const {Layout, MetaTag, Link, Script, Page} = getModels();

    const { app, theme, title, page, headers, sections, options } = await Layout.findAll({ limit: 1, order: [['id', 'DESC']] })
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

    return { app, theme, title, pages };
};

const cache = {};

export const layout = async(async (req, params, resolve, reject) => {
    resolve((cache.layout = cache.layout || await getLayoutConfig()));
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
