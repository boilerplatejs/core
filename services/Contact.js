import async from '@boilerplatejs/core/lib/Promise';
import {Contact} from '@boilerplatejs/core/models/default';

export const create = async(async (req, params, resolve, reject) => {
    const {email, newsletter, quote, lead} = req.body;
    const contact = await Contact.findOne({ where: { email } });

    req.body.newsletter = req.body.newsletter || false;

    try {
        if (contact && !(lead || quote) && contact.newsletter && newsletter) {
            reject(Object.assign(new Error(`The email address "${contact.email}" has already been registered.`), { status: 400 }));
        } else if (contact) {
            req.body.newsletter = contact.newsletter || req.body.newsletter;
            resolve(await contact.update(req.body));
        } else {
            resolve(await Contact.create(req.body));
        }
    } catch (e) {
        reject(e);
    }
});
