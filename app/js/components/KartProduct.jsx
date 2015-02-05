import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';
import format from 'string-format';

var KoolProduct = React.createClass({
  render() {
    return (
      <div id={this.props.item.id} title={this.props.item.title} className="product-item">
        <ul>
          <li>Price : {"£ " + this.props.item.value}</li>
          <li>({this.props.item.quantity}){this.props.item.name}</li>
        </ul>
        <a className="btn-link" onClick={this._onClick}>Remove item</a>
      </div>
    );
  },
  _onClick() {
    KartActionCreator.removeFromKart(this.props.item.id);
  }
});

export default  KoolProduct;