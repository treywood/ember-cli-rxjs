import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';

export function initialize() {
  Ember.Route.reopen(ObserveActionMixin, {

    setupController(controller, model) {
      if (model && typeof model.subscribe === "function") {
        model.subscribe(x => controller.set('model', x));
      } else {
        controller.set('model', model);
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
  name: 'observable-route',
  initialize
};
