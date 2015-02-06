import React from 'react'
import KartStore from '../stores/KartStore';
import KartProduct from '../components/kartProduct';
import 'string-format';

var KartList = React.createClass({
  getInitialState() {
    return this._getStateFromStore();
  },
  componentWillMount() {
    KartStore.addChangeListener(this._onChange);
  },
  componentWillUnmount() {
    KartStore.removeChangeListener(this._onChange);
  },
  render() {
    return (
      <div className="kart-list">
        {(this.state.numberOfItems > 0 ) ? this._getConsole() : ""}
        <div>
        {this._renderItem()}
        </div>
        {(this.state.numberOfItems > 0 ) ? this._getCheckoutButton() : ""}

      </div>
    )
  },
  _getCheckoutButton() {
    return <button className="btn btn-success" onClick={this._onClick}>Proceed to checkout</button>
  },
  _getConsole() {
    return <div className="well panel panel-success ">
      <p>{"Subtotal ({} item)".format(this.state.numberOfItems)}</p>
      <h2 className="panel-heading">{"£{}".format(this.state.total) }</h2>
    </div>
  },
  _renderItem() {
    return this.state.items.map(item => {
      return <KartProduct item={item} />
    })
  },
  _onChange() {
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore() {
    function numOfItems() {
      var items = KartStore.getAll(),
        num = 0;
      for (var i = 0; i < items.length; i++) {
        num += Number(items[i].quantity);
      }
      return num;
    }

    return {
      items: KartStore.getAll(),
      total: KartStore.getTotalCost(),
      numberOfItems: numOfItems()
    }
  }
});

export default KartList

