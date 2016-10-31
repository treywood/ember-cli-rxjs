import Ember from 'ember';
import ObservableControllerInitializer from 'dummy/initializers/observable-controller';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | observable controller', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ObservableControllerInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
