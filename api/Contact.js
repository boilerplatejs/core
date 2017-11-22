import async from '@vitruvian-tech/app-studio-core/lib/Promise';

export const create = async((req, params, resolve, reject) => {
    resolve(req.body);
});
