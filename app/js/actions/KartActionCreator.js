import AppDispatcher from '../dispatcher/AppDispatcher';
import KartConstants from '../constants/KartConstants';
import reqwest  from 'reqwest';

var KoolActions = {
  init() {
//    return;
   reqwest({
      url: '/mock/data.json'
      , method: 'get'
      , data: [{name: 'test', value: 1}]
      , success: function(resp) {
        AppDispatcher.handleServerAction({
          actionType: KartConstants.INIT,
          data: resp
        });
      }
    });

  },
  addToKart(item) {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.ADD_TO_KART,
      item: item
    });
  },
  removeItemFromKart(id) {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.REMOVE_ITEM_FROM_KART,
      id: id
    });
  },
  removeAllItemsFromKart(id) {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.REMOVE_FROM_KART,
      id: id
    });
  }
};

export default KoolActions;
