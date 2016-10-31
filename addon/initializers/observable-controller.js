import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';

function property(propertyName) {
  let s = this._propSubjects[propertyName] || (this._propSubjects[propertyName] = new Rx.Subject());
  this.addObserver(propertyName, () => {
    try {
      s.onNext(this.get(propertyName));
    } catch (e) {
      s.onError(e);
    }
  });
  return s.asObservable();
}

function properties(...props) {
  return Rx.Observable.combineLatest(props.map(p => this.observable.property(p)));
}

export function initialize() {

  Ember.Controller.reopen(ObserveActionMixin, {

    _observableSetup: Ember.on('init', function() {
      this._super();
      if (!this.observable) {
        this.observable = {};
      }

      this._propSubjects = {};
      this.observable.property = property.bind(this);
      this.observable.properties = properties.bind(this);
    })

  });
}

export default {
  name: 'observable-controller',
  initialize
};
