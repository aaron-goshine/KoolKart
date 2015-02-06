/**
 * Created by aaron.goshine on 06/02/15.
 */
var ReactTools = require('react-tools');
module.exports = {
  process: function(src) {
    return ReactTools.transform(src, {harmony: true});
  }
};
