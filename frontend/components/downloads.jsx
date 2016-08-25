const React = require('react');
const AppStore = require("../stores/app_store");
const AppActions = require("../actions/app_actions");
const Tags = require("./tags");

const Downloads = React.createClass({
  getInitialState() {
   return({downloads: []});
  },

  componentDidMount() {
    this.listener = AppStore.addListener(this._onChange);
    AppActions.fetchData();
  },

  componentWillUnmount() {
    this.listener.remove();
  },

  _onChange() {
    this.setState({downloads: AppStore.allDownloads()});
  },

  deleteTag(tag, download) {
    AppActions.deleteTag(tag, download);
  },

  addTag(tag, download) {
    AppActions.createTag(tag, download);
  },

  highlighted(download) {
    let bool = false;
    this.props.hover.forEach(match => {
      if (match.size === download.size){
        // alert("match found!");
        bool = true;
      }
    });
    return bool;
  },

  render: function() {
    let downloads = [];
    let classes = "";
    let i = 0;
    if (this.state.downloads.length > 0) {
      this.state.downloads.forEach(download => {
        if (this.highlighted(download)) {
          // debugger
          classes = "download highlighted";
        } else {
          classes = "download";
        }
        let speed = (download.size / download.time).toFixed(2);
        let string = `${download.size}MB in ${download.time} seconds. (${speed}MB/s)`;
        downloads.push(
          (<div className={classes} key={i}>
            <div className="left">
              {string}
            </div>
            <Tags deleteTag={this.deleteTag}
                  addTag={this.addTag}
                  download={download.size}
                  tags={download.tags}/>
          </div>));
        i++;
      });
    }

    return (
      <div>
        <h1>Download Sessions</h1>
        <div className="downloads-list">{downloads}</div>
      </div>
    );
  }

});

module.exports = Downloads;
