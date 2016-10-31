/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-rxjs',
  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + "/rxjs/dist/rx.all.compat.js");
  }
};
