import AppDispatcher from '../dispatcher/AppDispatcher';
import KartConstants from '../constants/KartConstants';
import reqwest  from 'reqwest';

var KoolActions = {
  init() {
    var rqw = reqwest({
      url: '/data.json'
      , method: 'get'
      , data: [{name: 'test', value: 1}]
      , success: function(resp) {
        AppDispatcher.handleServerAction({
          actionType: KartConstants.INIT,
          data: resp
        });
      }
    })
      .then(function(resp) {
      })
      .fail(function(req, msg) {
      })
      .always(function(resp) {

        console.log(resp)

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
