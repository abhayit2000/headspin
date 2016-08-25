const React = require('react');

const NewTag = React.createClass({
  getInitialState() {
    return({name: "", value: ""});
  },

  nameChange(e){
    this.setState({name: e.target.value});
  },

  valueChange(e) {
    this.setState({value: e.target.value});
  },

  handleClick() {
    this.props.addTag({
      name: this.state.name,
      value: this.state.value
    }, this.props.download);
    this.props.hideDisplay();
  },

  render: function() {
    return (
      <span className="drop-down">
        <input onChange={this.nameChange} className="input"
          type="text" placeholder="tag type"/>
        <input onChange={this.valueChange} className="input"
          type="text" placeholder="tag name"/>
        <span onClick={this.handleClick} className="add-button">add</span>
      </span>
    );
  }

});

module.exports = NewTag;
