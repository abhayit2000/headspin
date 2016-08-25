const React = require('react');
const AppStore = require("../stores/app_store");
const NewSelection = require("./new_selection");
const AppActions = require("../actions/app_actions");

const Selections = React.createClass({
  getInitialState() {
    return({selections: [], displayInput: false});
  },

  componentDidMount() {
    this.listener = AppStore.addListener(this._onChange);
    this.setState({selections: AppStore.allSelections()});
  },

  componentWillUnmount() {
    this.listener.remove();
  },

  _onChange() {
    this.setState({selections: AppStore.allSelections()});
  },

  displayInput() {
    if (this.state.displayInput === false) {
      this.setState({displayInput: true});
    } else {
      this.setState({displayInput: false});
    }
  },

  deleteSelection(id) {
    AppActions.deleteSelection(id);
    this.props.removeHover();
  },

  render: function() {
    let selections = [];
    let i = 0;
    if ((this.state.selections) && (this.state.selections.length > 0)) {
      this.state.selections.forEach(selection => {
        let tags = selection.queryTags.map(tag => {
          return(<span className="tag"
          key={tag.name}>{tag.name} = {tag.value} </span>);
        });
        if (selection.length === 0) {
          selections.push(
            <div className="empty selection">
              No Sessions Found.
              <div className="selection-tags">{tags}</div>
              <img onClick={()=> this.deleteSelection(selection.id)}
                  src={"./app/assets/img/trash.png"} className="delete-selection"/>
            </div>
          );
        } else {
          selections.push(
            <div className="selection"
              onMouseOut={this.props.removeHover}
              onMouseOver={()=>this.props.addHover(selection.list)} key={i}>
              <div className="averages">
                <div className="length"> {selection.list.length} sessions found!</div>
                <div className="data">{selection.averageData} MB (average data)</div>
                <div className="time">{selection.averageTime} seconds (average time)</div>
                <div className="speed">{selection.averageSpeed} MB/s (average speed)</div>
              </div>
                <div className="selection-tags">{tags}</div>
                  <img onClick={()=> this.deleteSelection(selection.id)}
                      src={"./app/assets/img/trash.png"} className="delete-selection"/>
            </div>
          );
        }
        i++;
      });
    }
    return (
      <div className="selections-list">
        <h1>Selections
          <img onClick={this.displayInput}
              className="new-selection"
              src={"./app/assets/img/add.png"}/> </h1>

            {this.state.displayInput ? <NewSelection
               hideDisplay={this.displayInput}/> : null}

            {selections}
      </div>
    );
  }

});

module.exports = Selections;
