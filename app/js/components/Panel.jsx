import React from 'react';
import KartStore from '../stores/KartStore';
var Panel = React.createClass({
  render() {
    return (
      <section className="panel">
        <header>Choose items </header>
        <ul>
          <li>one</li>
          <li>two</li>
          <li>thre</li>
        </ul>
      </section>
    )
  }
});
export default  Panel;