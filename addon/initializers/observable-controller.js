import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';

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

export function initialize() {

  Ember.Controller.reopen(ObserveActionMixin, {

    init() {
      this._super(...arguments);

      if (!this.observable) {
        this.observable = {};
      }

      this._propSubjects = {};
      this.observable.property = property.bind(this);
      this.observable.properties = properties.bind(this);
    }

  });
}

export default {
  name: 'observable-controller',
  initialize
};