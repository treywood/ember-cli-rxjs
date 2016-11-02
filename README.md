# ember-cli-rxjs

## Description
Exposes some simple utilities for creating and consuming RxJs Observables within your Ember application.

## Installation

```
$ ember install ember-cli-rxjs
```

## Usage

After installing the addon, you will have access to a few utilities for creating Observables from Controllers, Routes, and Components. These utilities live in the `this.observable` namespace from within your objects.

This addon also enables you to return an Observable from your Routes' `model` hook (as you might return a Promise). If your `model` hook returns an Observable, it will be subscribed to, updating the model with every emitted value.

You can import RxJs from the `rxjs` module:

```
import Rx from 'rxjs/Rx';
```

Note that - for the sake of your build sizes - only the operators and observables necessary to implement the utilities below are imported within the addon. This means that in order to use the majority of RxJs' operators, you will need to import them (or everything from ```rxjs/Rx```) in your own app.

More on that [here](https://github.com/ReactiveX/rxjs#installation-and-usage).

## Utilities

`this.observable.property(propertyName)`: Observe the value of a given property and emit new values as the property value changes.

`this.observable.properties(prop1, prop2, ...)`: Observe multiple property values a la `Rx.Observable.combineLatest`.

`this.observable.action(actionName, bubble)`: Observe an action, and emit a message whenever the action is invoked. If you define an action handler in the `actions` hash, and observe that action with this method, the handler will be invoked before the Observable emits its message. If `bubble` is `true`, the action will bubble. If an action handler exists, the `bubble` parameter is ignored and bubbling should be determined by the handler.
