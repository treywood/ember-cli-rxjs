import Ember from 'ember';
import ObservableMixin from 'ember-cli-rxjs/mixins/observable';

export function initialize() {
  Ember.Route.reopen(ObservableMixin, {

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

  Ember.Controller.reopen(ObservableMixin);
  Ember.Component.reopen(ObservableMixin);
}

export default {
  name: 'observable',
  initialize
};
