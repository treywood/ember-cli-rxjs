import Ember from 'ember';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/map';

export default Ember.Route.extend({

  model() {
    const pos = x => x * 1;
    const neg = x => x * -1;

    return this.observable.action('reverse')
      .scan(op => op === pos ? neg : pos, pos)
      .startWith(pos)
      .combineLatest(interval(1000))
      .map(([op, n]) => op(n));
  },

  setupController(controller, model) {
    let xs = model.combineLatest(controller.observable.property('multiplier')).map(([x,y]) => x * y);
    this._super(controller, xs);
  },

  actions: {
    reverse() {
      console.log('reversed it');
    },
    bubble() {
      console.log('route hanled it!');
    }
  }

});
