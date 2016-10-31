import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';
import { module, test } from 'qunit';

module('Unit | Mixin | observe action');

// Replace this with your real tests.
test('it works', function(assert) {
  let ObserveActionObject = Ember.Object.extend(ObserveActionMixin);
  let subject = ObserveActionObject.create();
  assert.ok(subject);
});
