const Store = require('flux/utils').Store;
const Dispatcher = require('../dispatcher/dispatcher');

const AppStore = new Store(Dispatcher);

let downloads = {};
let selections = [];
let selectionCounter = 0;

function deleteTag(tag, download) {
  downloads.forEach(dl => {
    if (dl.size === download) {
      dl.tags.forEach((tg, idx) => {
        if (tg.name === tag.name) {
          dl.tags.splice(idx, 1);
        }
      });
    }
  });
}

function createTag(tag, download) {
  downloads.forEach(dl => {
    if (dl.size === download) {
      dl.tags.push(tag);
    }
  });
}

function createSelection(queryTags) {
  let list = [];
  queryTags.forEach(function(queryTag){
    downloads.forEach(download => {
      download.tags.forEach(tag => {
        if ((tag.name === queryTag.name) && (tag.value === queryTag.value)) {
          list.push(download);
        }
      });
    });
  });

  let length = list.length;
  let timeSum = 0;
  let dataSum = 0;

  list.forEach(download => {
    timeSum += download.time;
    dataSum += download.size;
  });

  let averageTime = (timeSum / length).toFixed(2);
  let averageData = (dataSum / length).toFixed(2);

  let selection = {id: selectionCounter, queryTags: queryTags, length: length,
    averageData: averageData, averageTime: averageTime,
    averageSpeed: (averageData / averageTime).toFixed(2), list: list};

  selections.push(selection);
  selectionCounter++;
}

function updateSelections() {
  let oldSelections = selections;
  selections = [];
  oldSelections.forEach(selection => {
    createSelection(selection.queryTags);
  });
}

function deleteSelection(id) {
  selections.forEach((selection, idx) => {
    if (selection.id === id){
      selections.splice(idx, 1);
    }
  });
}

AppStore.allDownloads = function () {
  return downloads;
};

AppStore.allSelections = function () {
  return selections;
};

AppStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "DOWNLOADS_RECEIVED":
      downloads = payload.downloads;
      AppStore.__emitChange();
      break;
    case "DELETE_TAG":
      deleteTag(payload.tag, payload.download);
      updateSelections();
      AppStore.__emitChange();
      break;
    case "CREATE_TAG":
      createTag(payload.tag, payload.download);
      updateSelections();
      AppStore.__emitChange();
      break;
    case "CREATE_SELECTION":
      createSelection(payload.tags);
      AppStore.__emitChange();
      break;
    case "DELETE_SELECTION":
      deleteSelection(payload.id);
      AppStore.__emitChange();
      break;
  }
};

module.exports = AppStore;
