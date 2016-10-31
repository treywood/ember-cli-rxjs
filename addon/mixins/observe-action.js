import Ember from 'ember';

function action(action) {
  let existing = this.actions[action] || function() {};
  let s = this._actionSubjects[action];
  if (!s) {
     s = (this._actionSubjects[action] = new Rx.Subject());
     this.actions[action] = function() {
       try {
         existing.apply(this, arguments);
         s.onNext(arguments[0]);
       } catch(e) {
         s.onError(e);
       }
     };
  }
  return s.asObservable();
}

export default Ember.Mixin.create({

  init() {
    this._super(...arguments);

    if (!this.observable) {
      this.observable = {};
    }

    this._actionSubjects = {};
    this.observable.action = action.bind(this);
  }

});
