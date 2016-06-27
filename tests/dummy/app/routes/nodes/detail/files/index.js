import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    setupController(controller, model) {
        this._super(controller, model);
        let node = this.modelFor('nodes.detail');
        controller.set('node', node);
    },
});
