import AppDispatcher  from '../dispatcher/AppDispatcher' ;
import {EventEmitter} from 'events';
import KartConstants from '../constants/KartConstants';
import _ from 'lodash';

var CHANGE_EVENT = 'change';
var _Items = [];

var KoolStore = _.assign(new EventEmitter, {
  getAll() {
    return _Items;
  },
  getItemById(id) {
    return _.filter(_Items, {id: id})[0];
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register((payload) => {
  var action = payload.action;
  switch (action.actionType) {
    case KartConstants.INIT:
      _Items = action.data;
      KoolStore.emitChange();
      break;
  }
  return true;
});

module.exports = KoolStore;
