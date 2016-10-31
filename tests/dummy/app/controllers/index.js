import 'ember-cli-rxjs/lib/scheduler';
import Ember from 'ember';

export default Ember.Controller.extend({

  init() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      Rx.Observable.interval(1000).observeOn(Rx.Scheduler.ember).subscribe(i => {
        this.set('number', i);
      });
    });
  }

});
