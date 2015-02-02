var React = require('react');

var KartApp = React.createClass({
  render() {
    return (
      <h1> Hello</h1>
    )

  }

});

//require('./components/KartApp');
React.renderComponent(
  <KartApp />,
  document.getElementById('kartApp')
);



