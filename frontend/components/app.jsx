const React = require("react");
const Downloads = require("./downloads");
const Selections = require("./selection");

const App = React.createClass({
  getInitialState(){
    return {hover: []};
  },
  addHover(list) {
    this.setState({hover: list});
  },

  removeHover() {
    this.setState({hover: []});
  },
  render: function() {
    return (
      <div className="app">
        <Selections addHover={this.addHover} removeHover={this.removeHover}/>
        <Downloads hover={this.state.hover}/>
      </div>
    );
  }

});

module.exports = App;
