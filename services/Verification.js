import superagent from 'superagent';

export const check = async req => {
    const {token} = req.query;
    const secret = (await req.service.get('/@boilerplatejs/core/Config/service?bundle=@boilerplatejs/core')).recaptchaSecretKey;

    try {
      return JSON.parse((await superagent.get(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)).text);
    } catch (e) {
      return e;
    }
};