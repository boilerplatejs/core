import async from '@vitruvian-tech/app-studio-core/lib/Promise';

export default async((req, params, resolve) => {
  req.session = null;
  resolve(null);
});
