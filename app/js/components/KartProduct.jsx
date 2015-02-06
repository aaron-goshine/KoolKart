import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';
import 'string-format' ;

var KoolProduct = React.createClass({
  render() {
    var item = this.props.item;
    return (
      <div id={item.id} title={item.title} className="product-item fade-in">
        <span className="glyphicon glyphicon-remove-circle"  onClick={this._onClickRemoveAll} title="Remove all"></span>
        <ul>
          <li>{"Price : {}".format(item.value)}</li>
          <li>{"({}) {}".format(item.quantity, item.name)}</li>
        </ul>
        <a className="btn-link-custom" onClick={this._onClickRemoveItem} title="Remove one">Remove item</a>
      </div>
    );
  },
  _onClickRemoveItem() {
    KartActionCreator.removeItemFromKart(this.props.item.id);
  },
  _onClickRemoveAll() {
    KartActionCreator.removeAllItemsFromKart(this.props.item.id);
  }
});

export default  KoolProduct;