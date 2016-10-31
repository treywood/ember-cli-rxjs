import Ember from 'ember';

function now() {
  return new Date();
}

function schedule(state, action) {
  let disposable = new Rx.SingleAssignmentDisposable();
  Ember.run.schedule('actions', () => {
    disposable.setDisposable(action(this, state));
  });
  return disposable;
}

function scheduleRelative(state, dueTime, action) {
  let disposable = new Rx.SingleAssignmentDisposable();
  Ember.run.later('actions', () => {
    disposable.setDisposable(action(this, state));
  }, dueTime);
  return disposable;
}

function EmberScheduler() {
  Rx.Scheduler.call(this);
}

EmberScheduler.prototype = Object.create(Rx.Scheduler.prototype);
EmberScheduler.prototype.now = now;
EmberScheduler.prototype.schedule = schedule;
EmberScheduler.prototype._scheduleFuture = scheduleRelative;

Rx.Scheduler.ember = new EmberScheduler();

export default Rx.Scheduler.ember;
