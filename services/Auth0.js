import superagent from 'superagent';

const config = req => req.service.get(`/@boilerplatejs/core/Config/components?bundle=@boilerplatejs/core`);

export const login = async req => await superagent
    .get(`https://${(await config(req)).auth0Domain}.auth0.com/userinfo`)
    .set('Authorization', `Bearer ${req.body.access_token}`)
    .set('Accept', 'application/json')
    .then(res => ({ ...req.body, ...res.body }));

export const logout = async req => true;
