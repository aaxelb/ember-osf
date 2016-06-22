import Ember from 'ember';
import DS from 'ember-data';

function loadedItemsAttr(key) {
    return `__${key}_loadedItems`;
}

function nextPageAttr(key) {
    return `__${key}_lastLoadedPage`;
}

function clearAttrs(model, key) {
    model.get(loadedItemsAttr(key)).clear();
    model.set(nextPageAttr(key), undefined);
}

function paginatedHasMany() {
    let hasMany = DS.hasMany(...arguments);

    return Ember.computed({
        get(key) {
            let model = this;
            let loadedItemsName = loadedItemsAttr(key);
            let loadedItems = this.get(loadedItemsName);
            if (!loadedItems) {
                loadedItems = this.set(loadedItemsName, Ember.A());
            }

            let promise = hasMany._getter.call(this, ...arguments);
            return DS.PromiseArray.create({
                loadedItems,
                promise: promise.then((result) => {
                    loadedItems.addObjects(result);
                    let pageAttr = nextPageAttr(key);
                    if (!model.get(pageAttr)) {
                        model.set(pageAttr, 2);
                    }
                    return result;
                }),
                loadPage() {
                    let pageAttr = nextPageAttr(key);
                    let page = model.get(pageAttr);
                    return model.query(key, {page}).then((result) => {
                        loadedItems.addObjects(result);
                        model.set(pageAttr, page + 1);
                        return result;
                    });
                },
                reload() {
                    clearAttrs(model, key);
                    return hasMany.reload.call(model);
                }
            });
        },
        set(key, value) {
            clearAttrs(this, key);
            //let attr = loadedItemsAttr(key);
            //this.set(attr, value);
            return hasMany._setter.call(this, ...arguments);
        }
    }).meta(hasMany.meta());
}

export {paginatedHasMany};
export default Ember.Mixin.create({
    getNextPage(key) {

    }
});
