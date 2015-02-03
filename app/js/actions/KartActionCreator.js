import AppDispatcher from '../dispatcher/AppDispatcher';
import KartConstants from '../constants/KartConstants';

var KoolActions = {
  init() {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.INIT
    });
  },
  addToKart(id) {
    AppDispatcher.handleViewAction({
      actionType: KartConstants.ADD_TO_KART,
      id: id
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
