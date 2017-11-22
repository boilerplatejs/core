import async from '@vitruvian-tech/app-studio-core/lib/Promise';

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
