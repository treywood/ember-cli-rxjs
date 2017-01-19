import Ember from 'ember';
import ObservableMixin from 'ember-cli-rxjs/mixins/observable';
import { module, test } from 'qunit';

module('Unit | Mixin | observable');

test('this.observable.property', function(assert) {
  let done = assert.async();

  let ObserveActionObject = Ember.Object.extend(ObservableMixin);
  let subject = ObserveActionObject.create({ x: '1' });
  assert.ok(subject);

  let expected = ['1','4','3'];
  subject.observable.property('x').subscribe(x => {
    assert.equal(x, expected.shift());
    if (expected.length === 0) {
      done();
    }
  });

  subject.set('x', '4');
  subject.set('x', '3');
});

test('this.observable.property unsubscription', function(assert) {

  let ObserveActionObject = Ember.Object.extend(ObservableMixin);
  let subject = ObserveActionObject.create({ x: '1' });
  assert.ok(subject);

  assert.equal(subject.observersForKey('x').length, 0);

  let sub = subject.observable.property('x').subscribe(() => {});
  assert.equal(subject.observersForKey('x').length, 1);

  sub.unsubscribe();
  assert.equal(subject.observersForKey('x').length, 0);

});

test('this.observable.properties', function(assert) {
  let done = assert.async();

  let ObserveActionObject = Ember.Object.extend(ObservableMixin);
  let subject = ObserveActionObject.create({ x: '1', y: 'a' });
  assert.ok(subject);

  let expected = [{x:'1',y:'a'},{x:'1',y:'b'},{x:'2',y:'b'}];
  subject.observable.properties('x','y').subscribe(xs => {
    assert.deepEqual(xs, expected.shift());
    if (expected.length === 0) {
      done();
    }
  });

  subject.set('y', 'b');
  subject.set('x', '2');
});

test('this.observable.properties unsubscription', function(assert) {

  let ObserveActionObject = Ember.Object.extend(ObservableMixin);
  let subject = ObserveActionObject.create({ x: '1' });
  assert.ok(subject);

  assert.equal(subject.observersForKey('x').length, 0);
  assert.equal(subject.observersForKey('y').length, 0);

  let sub = subject.observable.properties('x','y').subscribe(() => {});
  assert.equal(subject.observersForKey('x').length, 1);
  assert.equal(subject.observersForKey('y').length, 1);

  sub.unsubscribe();
  assert.equal(subject.observersForKey('x').length, 0);
  assert.equal(subject.observersForKey('x').length, 0);

});

test('this.observable.action', function(assert) {
  let done = assert.async();

  let ObserveActionRoute = Ember.Route.extend(ObservableMixin);
  let subject = ObserveActionRoute.create();
  assert.ok(subject);

  let expected = { x: 1 };
  subject.observable.action('test').subscribe(x => {
    assert.deepEqual(x, expected);
    done();
  });

  subject.send('test', { x: 1 });
});

test('this.observable.action unsubscription', function(assert) {
  let ObserveActionRoute = Ember.Route.extend(ObservableMixin, {
    actions: {
      test() { }
    }
  });

  let subject = ObserveActionRoute.create();
  assert.ok(subject);

  let originalAction = subject.actions.test;
  assert.equal(typeof originalAction, 'function');

  let sub = subject.observable.action('test').subscribe(() => {});
  assert.notEqual(subject.actions.test, originalAction);

  sub.unsubscribe();
  assert.equal(subject.actions.test, originalAction);
});
