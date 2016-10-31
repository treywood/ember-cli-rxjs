import Ember from 'ember';

function action(action) {
  let existing = this.actions[action] || function() {};
  let s = this._actionSubjects[action] || (this._actionSubjects[action] = new Rx.Subject());
  this.actions[action] = function() {
    try {
      existing.apply(this, arguments);
      s.onNext(arguments[0]);
    } catch(e) {
      s.onError(e);
    }
  };
  return s.asObservable();
}

export default Ember.Mixin.create({

  _initObservable: Ember.on('init', function() {

    if (!this.observable) {
      this.observable = {};
    }

    this._actionSubjects = {};
    this.observable.action = action.bind(this);
  })

});
