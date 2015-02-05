import React from 'react'
import KartStore from '../stores/KartStore';
import KartProduct from '../components/kartProduct';
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
        {this._renderItem(this.state.items)}
        </div>
        {(this.state.numberOfItems > 0 ) ? this._getCheckoutButton() : ""}

      </div>
    )
  },
  _getCheckoutButton() {
    return <div>
      <button className="btn btn-success" onClick={this._onClick}>Proceed to checkout</button>
      <p>20%
        <a href="https://www.gov.uk/business-tax/vat">vat</a>
      </p>
    </div>
  },
  _getConsole() {
    return <div className="total-console">
     {"Subtotal ( " + this.state.numberOfItems + " item ) :" + " £" + this.state.total }
    </div>
  },
  _renderItem(items) {
    return items.map(item => {
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

