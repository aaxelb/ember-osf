import Ember from 'ember';
import InfinityComponentMixin from 'ember-osf/mixins/infinity-component';
import { module, test } from 'qunit';

module('Unit | Mixin | infinity component');

// Replace this with your real tests.
test('it works', function(assert) {
  let InfinityComponentObject = Ember.Object.extend(InfinityComponentMixin);
  let subject = InfinityComponentObject.create();
  assert.ok(subject);
});
