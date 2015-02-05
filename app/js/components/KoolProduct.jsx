import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';
import format from 'string-format';
import KoolStore from '../stores/KoolStore';

var KoolProduct = React.createClass({
  getInitialState() {
    return {}
  },
  componentWillReceiveProps(props) {
    this.setState(props.item);
  },
  render() {
    return (
      <div id={this.state.id} title={this.state.title} {...this.props}>
        <img src={this.state.imageName}/>
        <ul>
          <li>Price : {"£ " + this.state.value}</li>
          <li>{this.state.name}</li>
          <li>{this.state.prodDesc}</li>
        </ul>
        <button className="btn btn-default" onClick={this._onClick}>Add to list </button>
      </div>
    );
  },
  _onClick() {
    var item = KoolStore.getItemById(this.state.id);
    KartActionCreator.addToKart(item);
  }
});

export default  KoolProduct;