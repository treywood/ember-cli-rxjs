import Ember from 'ember';
import Rx from 'rxjs/Rx';

function action(actionName) {
  let existing = this.actions[actionName] || function() {};
  let s = this._actionSubjects[actionName];
  if (!s) {
     s = (this._actionSubjects[actionName] = new Rx.Subject());
     this.actions[actionName] = function() {
       try {
         existing.apply(this, arguments);
         s.next(arguments[0]);
       } catch(e) {
         s.error(e);
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
         s.next(this.get(propertyName));
       } catch (e) {
         s.error(e);
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

    this._actionSubjects = {};
    this._propSubjects = {};

    this.observable = {
      action: (actionName) => action.call(this, actionName),
      property: (propertyName) => property.call(this, propertyName),
      properties: (...props) => properties.apply(this, props)
    };
  }

});
