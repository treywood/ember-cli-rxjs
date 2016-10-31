import Ember from 'ember';

export default Ember.Controller.extend({

  init() {
    Rx.Observable.interval(1000).subscribe(i => {
      this.set('number', i);
    });
  }

});
