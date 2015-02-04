import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';
import format from 'string-format';

var KoolProduct = React.createClass({
  render() {
    return (
      <div id={this.props.item.id} title={this.props.item.title} className="product-item">
        <img src={this.props.item.imageName}/>
        <ul>
          <li>Price : {"£ " + this.props.item.value}</li>
          <li>Quantity : {this.props.item.quantity}</li>
          <li>{this.props.item.name}</li>
          <li>{this.props.item.prodDesc}</li>
        </ul>
        <button className="btn btn-remove" onClick={this._onClick}>Remove item</button>
      </div>
    );
  },
  _onClick() {
    KartActionCreator.removeFromKart(this.props.item.id);
  }
});

export default  KoolProduct;