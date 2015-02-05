import AppDispatcher  from '../dispatcher/AppDispatcher' ;
import {EventEmitter} from 'events';
import KartConstants from '../constants/KartConstants';
import merge from 'react/lib/merge';
import _ from 'lodash';

//-- mock data
//import items from '../mock/items.js';

var CHANGE_EVENT = 'change';

var _Items = [];

function init() {

}

var KoolStore = merge(EventEmitter.prototype, {
  getAll() {
    console.log("getAll");
    console.log(_Items);
    console.log("getAll");
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
      console.log("action");
      console.log(_Items);
      console.log("action");
      KoolStore.emitChange();
      break;
    default:
      return true;
  }
  return true;
});

module.exports = KoolStore;
