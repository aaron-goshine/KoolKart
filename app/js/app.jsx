import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Panel from './components/Panel';
import Basket from './components/KartList';
import KartActionCreator from './actions/KartActionCreator'

var KartApp = React.createClass({
  componentDidMount() {
    KartActionCreator.init();
  },
  render() {
    return (
      <section className="kart-wrapper col-xs-12 col-md-8">
        <Header/>
        <section id="main">
          <Panel/>
          <Basket/>
        </section>
        <Footer/>
      </section>
    )
  }
});

React.renderComponent(
  <KartApp />,
  document.getElementById('kartApp')
);



