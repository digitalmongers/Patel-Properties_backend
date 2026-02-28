// Basic context store using AsyncLocalStorage
const { AsyncLocalStorage } = require('async_hooks');

class RequestContext {
    static get store() {
        if (!this._store) {
            this._store = new AsyncLocalStorage();
        }
        return this._store;
    }

    static run(store, callback) {
        return this.store.run(store, callback);
    }

    static get(key) {
        const store = this.store.getStore();
        return store ? store[key] : undefined;
    }

    static set(key, value) {
        const store = this.store.getStore();
        if (store) {
            store[key] = value;
        }
    }

    static getAll() {
        return this.store.getStore() || {};
    }
}

module.exports = RequestContext;
