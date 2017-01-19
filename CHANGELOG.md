# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.2.0] - 2017-01-18
### Changed

Improved Observable creation and subscription so that property observers are removed when
there are no active property subscriptions. Also, action handlers are reset to their base
implementation when there are no active action subscriptions.

## [2.1.0] - 2016-12-14
### Added

Routes now have `subscribeController(controller)` and `unsubscribeController(controller)`
methods for managing subscriptions to an Observable model.

## [2.0.0] - 2016-12-13
### Changed

- `this.observable.properties` now emits an object hash of property values instead of an array

[Unreleased]: https://github.com/treywood/ember-cli-rxjs/compare/2.1.0...HEAD
[2.0.0]: https://github.com/treywood/ember-cli-rxjs/compare/1.0.0...2.0.0
[2.1.0]: https://github.com/treywood/ember-cli-rxjs/compare/2.0.0...2.1.0
[2.2.0]: https://github.com/treywood/ember-cli-rxjs/compare/2.0.0...2.2.0
