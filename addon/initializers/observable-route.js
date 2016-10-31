import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';

export function initialize() {
  Ember.Route.reopen(ObserveActionMixin, {

    init() {
      this._super(...arguments);
    },

    setupController(controller, model) {
      if (model && typeof model.subscribe === "function") {
        model.subscribe(x => controller.set('model', x));
      } else {
        this._super(...arguments);
      }
    }

  });
}

export default {
  name: 'observable-route',
  initialize
};
