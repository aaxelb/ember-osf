import Ember from 'ember';
import PaginatedHasManyMixin from 'ember-osf/mixins/paginated-has-many';
import { module, test } from 'qunit';

module('Unit | Mixin | paginated has many');

// Replace this with your real tests.
test('it works', function(assert) {
  let PaginatedHasManyObject = Ember.Object.extend(PaginatedHasManyMixin);
  let subject = PaginatedHasManyObject.create();
  assert.ok(subject);
});
