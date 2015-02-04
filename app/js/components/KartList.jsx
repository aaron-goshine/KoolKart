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
        <h2>Your Items</h2>
        <ul>
        {this._renderItem(this.state.items)}
        </ul>
        <div className="total-console">
        {this.state.total}
        </div>
      </div>
    )
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
    return {
      items: KartStore.getAll(),
      total: KartStore.getTotalCost()
    }
  }
});

export default KartList

