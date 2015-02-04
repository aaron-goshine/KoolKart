import React from 'react';
import KoolStore from '../stores/KoolStore';
import KoolProduct from '../components/KoolProduct';
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
      return <KoolProduct item={item} />
    })
  },
  _onChange() {
    this.setState(this._getStateFromStore());
  },
  _getStateFromStore() {
    return {
      items: KoolStore.getAll()
    }
  }
});
export default   KoolProductPanel;