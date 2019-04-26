import async from '@machete-platform/core-bundle/lib/Promise';

export const load = async((req, params, resolve) => {
    resolve(req.session.user || null);
});

export const login = async((req, params, resolve) => {
    const user = {
        name: req.body.name
    };
    req.session.user = user;
    resolve(user);
});

export const logout = async((req, params, resolve) => {
    req.session = null;
    resolve(null);
});
