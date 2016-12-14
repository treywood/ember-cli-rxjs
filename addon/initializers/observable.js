import Ember from 'ember';
import ObservableMixin from 'ember-cli-rxjs/mixins/observable';

export function initialize() {
  Ember.Route.reopen(ObservableMixin, {

    init() {
      this._super(...arguments);
      this._subs = {};
    },

    setupController(controller, model) {
      if (model && typeof model.subscribe === 'function') {
        this._modelObservable = model;
        if (!this._subs[controller]) {
          this.subscribeController(controller);
        }
      } else {
        this._super(...arguments);
      }
    },

    subscribeController(controller) {
      if (this._modelObservable) {
        this._subs[controller] =
          this._modelObservable.subscribe(x => controller.set('model', x));
      }
    },

    unsubscribeController(controller) {
      if (this._subs[controller]) {
        this._subs[controller].unsubscribe();
        delete this._subs[controller];
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
