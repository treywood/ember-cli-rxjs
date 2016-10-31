import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Rx.Observable.interval(1000).map(x => x * 10);
  }

});
