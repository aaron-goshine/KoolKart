import React from 'react';

var Product = React.createClass({
  getInitialState() {
    return {}
  },
  componentWillReceiveProps(props) {
    this.setState(props.item);
  },
  render() {
    return (
      <div id={this.state.id}>
        <img src={this.state.imageName}/>
        <ul>
          <li>Price : {this.state.value}</li>
          <li>{this.state.name}</li>
          <li>{this.state.title}</li>
          <li>{this.state.prodDesc}</li>
        </ul>
      </div>
    );
  }

});

export default  Product;