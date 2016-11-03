import Ember from 'ember';
import ObservableMixin from 'ember-cli-rxjs/mixins/observable';
import { Subscription } from 'rxjs/Subscription';

export function initialize() {
  Ember.Route.reopen(ObservableMixin, {

    init() {
      this._super(...arguments);
    },

    setupController(controller, model) {
      if (model && typeof model.subscribe === "function") {
        this._modelSubscription = model.subscribe(x => controller.set('model', x));
        this._modelSubscription.add(new Subscription(() => {
          controller.set('model', undefined);
        }));
      } else {
        this._super(...arguments);
      }
    },

    actions: {
      willTransition() {
        this._super(...arguments);
        if (this._modelSubscription) {
          this._modelSubscription.unsubscribe();
        }
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
