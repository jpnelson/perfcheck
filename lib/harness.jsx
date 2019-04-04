import * as React from "react";
import * as ReactDOM from "react-dom";

class Harness extends React.Component {
  render() {
    const Component = window.perfcheck[0].component;
    return <Component />;
  }
}

console.log(window.perfcheck[0].component);

ReactDOM.render(<Harness />, document.body);
