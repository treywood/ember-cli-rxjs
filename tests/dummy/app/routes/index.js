import Ember from 'ember';

export default Ember.Route.extend({

  init() {

  },

  model() {
    const pos = x => x * 10;
    const neg = x => x * -10;

    return this.observable.action('reverse')
      .scan(op => op === pos ? neg : pos, pos)
      .startWith(pos)
      .combineLatest(Rx.Observable.interval(1000))
      .map(([op, n]) => op(n));
  },

  actions: {
    reverse() {
      console.log('reversed it');
    }
  }

});
