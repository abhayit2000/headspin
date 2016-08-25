// React
const React = require("react");
const ReactDOM = require("react-dom");

// Components
const App = require("./components/app.jsx");

document.addEventListener("DOMContentLoaded", (e) => {
  let content = document.getElementById('content');

  ReactDOM.render(<App/>, content);
});
