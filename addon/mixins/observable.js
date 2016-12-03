import Ember from 'ember';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';

function action(actionName) {
  let existing = this.actions[actionName] || function() {};
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
     s = (this._propSubjects[propertyName] = new BehaviorSubject(this.get(propertyName)));
     this.addObserver(propertyName, () => {
       try {
         s.next(this.get(propertyName));
       } catch (e) {
         s.error(e);
       }
     });
  }
  return s.asObservable();
}

function properties(...props) {
  return merge(...props.map(p => this.observable.property(p)))
          /*
            Skip all but 1 of the first emissions. The BehaviorSubjects backing
            `this.observable.property` would otherwise cause all subscribers
            to immediately receive `props.length` identical emissions upon subscription,
            instead of just a single emission of the current values.
          */
          .skip(props.length - 1)
          .map(() => this.getProperties(props));
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
