import Ember from 'ember';
import Rx from 'rxjs/Rx';

export default Ember.Controller.extend({

  init() {
    this._super(...arguments);

    this.set('multiplier', 1);

    this.observable.property('multiplier')
      .combineLatest(Rx.Observable.interval(1000))
      .map(([m, i]) => m * i)
      .subscribe(x => this.set('number', x));
  }

});
