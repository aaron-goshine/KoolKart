import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MainSection from './components/MainSection';

var KartApp = React.createClass({
  render() {
    return (
      <section>
        <Header/>
        <MainSection/>
        <Footer/>
      </section>
    )
  }
});

React.renderComponent(
  <KartApp />,
  document.getElementById('kartApp')
);





