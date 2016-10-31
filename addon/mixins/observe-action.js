import Ember from 'ember';

export default Ember.Mixin.create({

  observeAction(action) {
    let existing = this.actions[action] || function() {};
    let s = new Rx.Subject();
    this.actions[action] = function() {
      existing.apply(this, arguments);
      s.onNext(arguments[0]);
    };
    return s.asObservable();
  }

});
