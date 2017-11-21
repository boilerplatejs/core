import async from '@vitruvian-tech/app-studio-core/lib/Promise';

export default async((req, params, resolve) => {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  resolve(user);
});
