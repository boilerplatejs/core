import async from '@machete-platform/core-bundle/lib/Promise';

export const create = async((req, params, resolve, reject) => {
    resolve(req.body);
});
