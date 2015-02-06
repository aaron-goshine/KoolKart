import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';
import format from 'string-format';
import KoolStore from '../stores/KoolStore';
import 'string-format';
import numbr from 'numbr';

var KoolProduct = React.createClass({
  render() {
    var item = this.props.item;
    return (
      <div id={ item.id} title={item.title} className={this.props.className}>
        <img src={item.imageName}/>
        <ul>
          <li>{"Price : {}".format(numbr(item.value).format('£0,0.00'))}</li>
          <li>{item.name}</li>
          <li>{item.prodDesc}</li>
        </ul>
        <button className="btn btn-default" onClick={this._onClick}>Add to list </button>
      </div>
    );
  },
  _onClick() {
    var item = KoolStore.getItemById(this.props.item.id);
    KartActionCreator.addToKart(item);
  }
});

export default  KoolProduct;