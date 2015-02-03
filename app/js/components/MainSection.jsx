import React from 'react';
import DisplayShelf from './DisplayShelf';
import Basket from './KartList';

var MainSection = React.createClass({
  render: function() {
    return (
      <section id="main">
        <DisplayShelf/>
        <Basket/>
      </section>
    );
  }
});

module.exports = MainSection;
