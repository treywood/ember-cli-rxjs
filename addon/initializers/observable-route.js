import Ember from 'ember';
import ObserveActionMixin from 'ember-cli-rxjs/mixins/observe-action';

export function initialize() {
  Ember.Route.reopen(ObserveActionMixin);
}

export default {
  name: 'observable-route',
  initialize
};
