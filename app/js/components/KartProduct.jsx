import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';
import format from 'string-format';

var KoolProduct = React.createClass({
  render() {
    return (
      <div id={this.props.item.id} title={this.props.item.title} className="product-item fade-in">
        <span className="glyphicon glyphicon-remove-circle"  onClick={this._onClickRemoveAll} title="Remove all"></span>
        <ul>
          <li>Price : {"£ " + this.props.item.value}</li>
          <li>({this.props.item.quantity}){this.props.item.name}</li>
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