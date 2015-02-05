import AppDispatcher  from '../dispatcher/AppDispatcher' ;
import {EventEmitter} from 'events';
import KartConstants from '../constants/KartConstants';
import _ from 'lodash';
//-- mock data
import items from '../mock/items.js';
var CHANGE_EVENT = 'change';
var _Items = [];

var KartStore = _.assign(new EventEmitter, {
  getAll() {
    return _Items;
  },
  getTotalCost() {
    var total = 0;
    for (var i = 0; i < _Items.length; i++) {
      var productValue = Number(_Items[i].value) * Number(_Items[i].quantity);
      total += productValue;
    }
    //TODO currencey formating
    return Math.round(total * 100) / 100;
  },
  addItem(item) {
    var tracker = false;
    for (var i = 0; i < _Items.length; i++) {
      if (_Items[i].id === item.id) {
        tracker = true;
        _Items[i].quantity++;
      }
    }
    if (!tracker) {
      item.quantity = 1;
      _Items.push(item);
    }

  },
  removeItem(id) {
    for (var i = 0; i < _Items.length; i++) {
      if (_Items[i].id === id) {
        if (_Items[i].quantity > 1) {
          _Items[i].quantity--;
        } else if (_Items[i].quantity >= 1) {
          _Items.splice(i, 1)
        }
      }
    }
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
    case KartConstants.REMOVE_FROM_KART:
      KartStore.removeItem(action.id);
      break;
    default:
      return true;
  }

  KartStore.emitChange();
  return true;
});

module.exports = KartStore;