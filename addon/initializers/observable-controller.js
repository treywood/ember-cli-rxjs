import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';

export function initialize() {

  Ember.Controller.reopen(ObserveActionMixin, {

    _propSubjects: {},

    observable: {
      property(propertyName) {
        let s = this._propSubjects[propertyName] || (this._propSubjects[propertyName] = new Rx.Subject());
        this.addObserver(propertyName, () => {
          try {
            s.onNext(this.get(propertyName));
          } catch (e) {
            s.onError(e);
          }
        });
        return s.asObservable();
      },

      properties(...props) {
        return Rx.Observable.combineLatest(props.map(p => this.observable.property(p)));
      }
    },

    __bindObservables: Ember.on('init', function() {
      for (let m in this.observable) {
        if (this.observable.hasOwnProperty(m)) {
          this.observable[m] = this.observable[m].bind(this);
        }
      }
    })

  });
}

export default {
  name: 'observable-controller',
  initialize
};
