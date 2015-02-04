import AppDispatcher from '../dispatcher/AppDispatcher';
import KartConstants from '../constants/KartConstants';

var KoolActions = {
  init() {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.INIT
    });
  },
  addToKart(item) {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.ADD_TO_KART,
      item: item
    });
  },
  removeFromKart(id) {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.REMOVE_FROM_KART,
      id: id
    });
  }
};

export default KoolActions;
