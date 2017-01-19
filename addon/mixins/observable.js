import Ember from 'ember';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { merge } from 'rxjs/observable/merge';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/multicast';

function action(actionName) {
  let s = this._actionObservables[actionName];
  if (!s) {
    s = Observable.create(o => {
      let existing = this.actions[actionName];
      this.actions[actionName] = function(x) {
        try {
          let r = (existing || function() {}).apply(this, arguments);
          o.next(x);
          return r;
        } catch (e) {
          o.error(e);
        }
      };
      return new Subscription(() => {
        this.actions[actionName] = existing;
      });
    }).multicast(new Subject()).refCount();

    this._actionObservables[actionName] = s;
  }
  return s;
}

function property(propertyName) {
  let s = this._propertyObservables[propertyName];
  if (!s) {
    s = Observable.create(o => {
      let next = () => o.next(this.get(propertyName));
      this.addObserver(propertyName, next);
      return new Subscription(() => {
        this.removeObserver(propertyName, next);
      });
    }).multicast(new BehaviorSubject(this.get(propertyName))).refCount();

    this._propertyObservables[propertyName] = s;
  }
  return s;
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

    this._actionObservables = {};
    this._propertyObservables = {};

    this.observable = {
      action: (actionName) => action.call(this, actionName),
      property: (propertyName) => property.call(this, propertyName),
      properties: (...props) => properties.apply(this, props)
    };
  }

});
