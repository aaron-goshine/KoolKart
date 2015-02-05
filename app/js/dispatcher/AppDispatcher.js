import {Dispatcher} from 'flux';
import copyProperties from 'react/lib/copyProperties';

var AppDispatcher = copyProperties(new Dispatcher(), {

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

export default AppDispatcher;
