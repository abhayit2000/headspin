const React = require('react');
const NewTag = require("./new_tag");

const Tags = React.createClass({
  getInitialState: function() {
      return { displayInput: false};
   },

  displayInput() {
    if (this.state.displayInput === false) {
      this.setState({displayInput: true});
    } else {
      this.setState({displayInput: false});
    }
  },

  render: function() {
    let tags = [];
    let i = 0;
    this.props.tags.forEach(tag => {
      let string = `${tag.name} = ${tag.value}`;
      tags.push(
        <span className="tag" key={i}> 
          {string}
          <img onClick={()=> this.props.deleteTag(tag, this.props.download)}
              src={"./app/assets/img/trash.png"} className="delete"/>
        </span>
      );
      i++;
    });
    return (
      <div className="tags">
        {tags}
        {this.state.displayInput ? <NewTag
          hideDisplay={this.displayInput}
          download={this.props.download}
          addTag={this.props.addTag}/> : null}
        <img onClick={this.displayInput}
            className="add-tag"
            src={"./app/assets/img/add.png"}/>
        </div>
    );
  }

});

module.exports = Tags;
