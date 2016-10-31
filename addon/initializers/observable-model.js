import Ember from 'ember';

export function initialize() {

  Ember.Route.reopen({

    setupController(controller, model) {
      if (model && typeof model.subscribe === "function") {
        model.subscribe(x => controller.set('model', x));
      } else {
        controller.set('model', model);
      }
    }

  });
  
}

export default {
  name: 'observable-model',
  initialize
};
