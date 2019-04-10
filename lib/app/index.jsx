import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    const files = document
      .querySelector("meta[entries]")
      .getAttribute("entries")
      .split(",");
    return (
      <main>
        <nav>
          <h1>Perfcheck</h1>
          <ul id="checks">
            {files.map(file => (
              <li>
                <a href={`${file}.html`}>{file.split("~")[0]}</a>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    );
  }
}

const style = document.createElement("style");
style.innerHTML = `
    body {
        font-family: Arial, Helvetica, sans-serif;
        margin: 0;
    }
    main {
        display: flex;
    }
    nav {
        width: 800px;
        height: 100vh;
        padding: 1rem;
        margin: auto;
    }

    #checks {
        list-style: none;
        margin: 0;
        padding: 0;
        line-height: 1.5;
    }

    #checks a {
        color: black;
    }

    #checks li {
        min-height: 2rem;
        border: 1px solid #e2e2e2a6;
        line-height: 2rem;
        padding: 0.5rem;
        margin: 0.5rem;
        box-shadow: 0 2px 4px 0px rgba(210,214,220,.5);
    }

    #checks li:before {
        content: '▶️';
    }

    #content {
        flex-grow: 1;
    }
`;

document.head.appendChild(style);

ReactDOM.render(<App />, document.body);
