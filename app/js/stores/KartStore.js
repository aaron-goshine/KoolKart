import AppDispatcher  from '../dispatcher/AppDispatcher' ;
import {EventEmitter} from 'events';
import KartConstants from '../constants/KartConstants';
import merge from 'react/lib/merge';

//-- mock data
import items from '../mock/items.js';
var CHANGE_EVENT = 'change';
var _Items = [];

var KartStore = merge(EventEmitter.prototype, {
  getAll() {
    return _Items;
  },
  getTotalCost() {
    var total = 0;
    for (var i = 0; i < _Items.length; i++) {
      var productValue = Number(_Items[i].value) * Number(_Items[i].count);
      total += productValue;
    }
    return Math.round(total);
  },
  addItem(item) {
    var tracker = false;

    for (var i = 0; i < _Items.length; i++) {
      if (_Items[i].id === item.id) {
        tracker = true;
        _Items[i].count++;
      }
    }

    if (!tracker) {
      item.count = 1;
      _Items.push(item);
    }

  },
  removeItem(item) {
    _Items.push(item);
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
    case KartConstants.ADD_TO_KART:
      KartStore.addItem(action.item);
      break;
    default:
      return true;
  }
  KartStore.emitChange();
  return true;
});

module.exports = KartStore;