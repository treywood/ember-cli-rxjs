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

    this.observable.action('nobubble').subscribe(() => {
      console.log('this should not bubble');
    });

    this.observable.action('bubble').subscribe(() => {
      console.log('this should bubble');
    });

    let properties = this.observable.properties('number','multiplier');

    properties.subscribe(props => console.log(1, props));

    setTimeout(() => {
      properties.subscribe(props => console.log(2, props));
    }, 2000);

  },

  actions: {
    bubble() {
      console.log('controller handled it, bubbling!');
      return true;
    }
  }

});
