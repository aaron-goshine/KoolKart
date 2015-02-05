import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import KoolProductPanel from './components/KoolProductPanel';
import KartList from './components/KartList';
import KartActionCreator from './actions/KartActionCreator'

var KartApp = React.createClass({
  componentDidMount() {
    KartActionCreator.init();
  },
  render() {
    return (
      <section >
        <section id="main"  className="main-section">
          <KoolProductPanel/>
          <KartList/>
        </section>
        <Footer/>
      </section>
    )
  }
});
React.render(
  <KartApp />,
  document.getElementById('kartApp')
);

