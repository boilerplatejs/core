export const load = async req => req.session.user || null;

export const login = async req => (req.session.user = req.body);

export const logout = async req => (req.session = null);
