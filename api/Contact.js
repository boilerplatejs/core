import async from '@machete-platform/core-bundle/lib/Promise';
import {Contact} from '@machete-platform/core-bundle/models/default';

export const create = async(async (req, params, resolve, reject) => {
    const {email} = req.body;
    const contact = await Contact.find({ where: { email } });

    try {
        if (contact) {
            reject(Object.assign(new Error(`The email address "${contact.email}" has already been registered.`), { status: 400 }));
        } else {
            resolve(await Contact.create(req.body));
        }
    } catch (e) {
        reject(e);
    }
});
