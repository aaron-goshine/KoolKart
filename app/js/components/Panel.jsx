import React from 'react';
import KartStore from '../stores/KartStore';
import Product from '../components/Product';
var Panel = React.createClass({
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
      <section className="panel">
        <header>Choose items </header>
        <div>
        {this._renderItem(this.state.items)}
        </div>
      </section>
    )
  },
  _renderItem(items) {
    
    return items.map(item => {
      return <Product item={item} />
    })
  },
  _onChange() {
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore() {
    return {
      items: KartStore.getAll()
    }
  }
});
export default  Panel;