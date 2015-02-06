var Dispatcher = require('flux').Dispatcher;
var _ = require('lodash');

var AppDispatcher = _.assign(new Dispatcher(), {

  handleViewAction(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },
  handleServerAction(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;
