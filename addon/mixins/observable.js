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

function property(propertyName) {
  let s = this._propSubjects[propertyName];
  if (!s) {
     s = (this._propSubjects[propertyName] = new Rx.Subject());
     this.addObserver(propertyName, () => {
       try {
         s.onNext(this.get(propertyName));
       } catch (e) {
         s.onError(e);
       }
     });
  }
  return s.asObservable().startWith(this.get(propertyName));
}

function properties(...props) {
  return Rx.Observable.combineLatest(props.map(p => this.observable.property(p)));
}

export default Ember.Mixin.create({

  init() {
    this._super(...arguments);

    if (!this.observable) {
      this.observable = {};
    }

    this._actionSubjects = {};
    this._propSubjects = {};

    this.observable.action = action.bind(this);
    this.observable.property = property.bind(this);
    this.observable.properties = properties.bind(this);
  }

});
