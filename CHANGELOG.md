# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

# [Unreleased]
### Added

Routes now have `subscribeController(controller)` and `unsubscribeController(controller)` methods for managing subscriptions to an Observable model.

## [2.0.0] - 2016-12-13
### Changed

- `this.observable.properties` now emits an object hash of property values instead of an array

[Unreleased]: https://github.com/olivierlacan/keep-a-changelog/compare/2.0.0...HEAD
[2.0.0]: https://github.com/treywood/ember-cli-rxjs/compare/1.0.0...2.0.0
