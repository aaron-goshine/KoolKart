import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';
import format from 'string-format';
import KoolStore from '../stores/KoolStore';

var KoolProduct = React.createClass({
  render() {
    var unitData = this.props.unitData;
    return (
      <div id={ unitData.id} title={unitData.title} className={this.props.className}>
        <img src={unitData.imageName}/>
        <ul>
          <li>Price : {"£ " + unitData.value}</li>
          <li>{unitData.name}</li>
          <li>{unitData.prodDesc}</li>
        </ul>
        <button className="btn btn-default" onClick={this._onClick}>Add to list </button>
      </div>
    );
  },
  _onClick() {
    var item = KoolStore.getItemById(this.props.unitData.id);
    KartActionCreator.addToKart(item);
  }
});

export default  KoolProduct;