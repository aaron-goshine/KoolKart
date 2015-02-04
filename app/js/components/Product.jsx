import React from 'react';
import KartActionCreator from '../actions/KartActionCreator';

var Product = React.createClass({
  getInitialState() {
    return {}
  },
  componentWillReceiveProps(props) {
    this.setState(props.item);
  },
  render() {
    return (
      <div id={this.state.id} >
        <img src={this.state.imageName}/>
        <ul>
          <li>Price : {this.state.value}</li>
          <li>{this.state.name}</li>
          <li>{this.state.title}</li>
          <li>{this.state.prodDesc}</li>
        </ul>
        <button onClick={this._onClick}>Add To List </button>
      </div>
    );
  },
  _onClick() {
    console.log(this.state.id);
    KartActionCreator.addItem(this.state.id);
  }
});

export default  Product;