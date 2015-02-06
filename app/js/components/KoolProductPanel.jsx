import React from 'react';
import KoolStore from '../stores/KoolStore';
import KoolProduct from '../components/KoolProduct';
import  _ from 'lodash';

var KoolProductPanel = React.createClass({
  getInitialState() {
    return this._getStateFromStore();
  },
  componentWillMount() {
    KoolStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    KoolStore.removeChangeListener(this._onChange);
  },
  render() {
    return (
      <div className="panel-custom">
        <header>
          <h2>Inspired by Your Shopping Trends</h2>
          <p>Your Recently Viewed Items and Featured Recommendations</p>
        </header>
        {this._renderItems()}
      </div>
    )
  },
  _renderItems() {
    var table = _.chunk(this.state.items, 3);
    return table.map(item => {
      return <div className="row"> {
        item.map(unit => {
          return <KoolProduct  className="col-xs-4 product-unit" item={unit} />;
        })}</div>
    })
  },
  _onChange() {
    console.log("the store have changed");
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore() {
    return {
      items: KoolStore.getAll()
    }
  }
});
export default   KoolProductPanel;