import Ember from 'ember';
import InfinityRoute from 'ember-osf/mixins/infinity-custom';

/**
 * Extend the route mixin from ember-infinity to work as a component mixin.
 *
 * Beware my folly.
 */
export default Ember.Mixin.create(InfinityRoute, {
    /* TODO: things
     * 
     * Parameters:
     *  _modelPath: relative to component
     *  _storeFindMethod: model.get('query').bind(model)
     */
});
