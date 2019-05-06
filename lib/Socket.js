import io from 'socket.io-client';

const sockets = {};

export default class {
    static get(path = 'ws', name = '') {
      return (sockets[path] = sockets[path] || io(name, {path: `/${path}`}));
    }
}
