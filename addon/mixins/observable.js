import Ember from 'ember';
import { Subject } from 'rxjs/Subject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import 'rxjs/add/operator/startWith';

function action(actionName, bubble = false) {
  let existing = this.actions[actionName] || (() => bubble);
  let s = this._actionSubjects[actionName];
  if (!s) {
     s = (this._actionSubjects[actionName] = new Subject());
     this.actions[actionName] = function() {
       try {
         let result = existing.apply(this, arguments);
         s.next(arguments[0]);
         return result;
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
     s = (this._propSubjects[propertyName] = new Subject());
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
  return combineLatest(props.map(p => this.observable.property(p)));
}

export default Ember.Mixin.create({

  init() {
    this._super(...arguments);

    this._actionSubjects = {};
    this._propSubjects = {};

    this.observable = {
      action: (actionName, bubble) => action.call(this, actionName, bubble),
      property: (propertyName) => property.call(this, propertyName),
      properties: (...props) => properties.apply(this, props)
    };
  }

});
