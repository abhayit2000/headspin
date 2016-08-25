const Dispatcher = require("../dispatcher/dispatcher");

module.exports = {
  fetchData() {
    let data = require("../../input_data.js");
    this.receiveData(data);
  },

  receiveData(data) {
    Dispatcher.dispatch({
     actionType: "DOWNLOADS_RECEIVED",
     downloads: data.downloads
   });
 },

  deleteTag(tag, download) {
    Dispatcher.dispatch({
     actionType: "DELETE_TAG",
     tag: tag,
     download: download
    });
  },

  createTag(tag, download) {
    Dispatcher.dispatch({
     actionType: "CREATE_TAG",
     tag: tag,
     download: download
    });
  },

  createSelection(tags) {
    Dispatcher.dispatch({
     actionType: "CREATE_SELECTION",
     tags: tags,
    });
  },

  deleteSelection(id) {
    Dispatcher.dispatch({
     actionType: "DELETE_SELECTION",
     id: id,
    });
  }
};
