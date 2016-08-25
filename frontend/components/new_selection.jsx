const React = require('react');
const AppActions = require("../actions/app_actions");

const NewSelection = React.createClass({
  getInitialState() {
    return({name: "", value: "", tags: []});
  },

  nameChange(e){
    this.setState({name: e.target.value});
  },

  valueChange(e) {
    this.setState({value: e.target.value});
  },

  addTag() {
    let newTag = {name: this.state.name, value: this.state.value };
    let currentTags = this.state.tags;
    currentTags.push(newTag);

    this.setState({name: "", value: "", tags: currentTags});
  },

  createSelection() {
    AppActions.createSelection(this.state.tags);
    this.props.hideDisplay();
  },


  render: function() {
    let tags = [];
    if (this.state.tags) {
      this.state.tags.forEach(tag => {
        let string = `${tag.name} = ${tag.value}`;
        tags.push(
          <div className="tag-query" key={tag.name}> {string} </div>
        );
      });
    }
    return (
      <div className="create-selection">
      {tags}
      <span>
        <input onChange={this.nameChange} className="input"
          type="text" placeholder="tag type" value={this.state.name}/>
        <input onChange={this.valueChange} className="input"
          type="text" placeholder="tag name" value={this.state.value}/>
        <span onClick={this.addTag} className="add-button">add tag</span>
        <span onClick={this.createSelection}
          className="add-button">create selection</span>
      </span>
    </div>
    );
  }

});

module.exports = NewSelection;
