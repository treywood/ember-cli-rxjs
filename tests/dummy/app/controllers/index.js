import Ember from 'ember';
import { interval } from 'rxjs/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';

export default Ember.Controller.extend({

  init() {
    this._super(...arguments);

    this.set('multiplier', 1);

    this.observable.property('multiplier')
      .combineLatest(interval(1000))
      .map(([m, i]) => m * i)
      .subscribe(x => this.set('number', x));

    this.observable.action('bubble', true).subscribe(() => {
      console.log('this should still bubble');
    });
  },

  actions: {
    bubble() {
      console.log('controller handled it, bubbling!');
      return true;
    }
  }

});
