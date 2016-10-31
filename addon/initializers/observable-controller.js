import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';

export function initialize() {
  Ember.Controller.reopen(ObserveActionMixin, {

    observeProp(propertyName) {
      let s = new Rx.Subject();
      this.addObserver(propertyName, () => {
        try {
          s.onNext(this.get(propertyName));
        } catch (e) {
          s.onError(e);
        }
      });
      return s.asObservable();
    },

    observeProps(...props) {
      return Rx.Observable.combineLatest(props.map(p => this.observeProp(p)));
    }

  });
}

export default {
  name: 'observable-controller',
  initialize
};
