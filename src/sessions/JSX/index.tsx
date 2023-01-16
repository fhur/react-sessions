import React from "react";

window.React = React;

export function JSXSession() {
  return (
    <article>
      <h1>JSX</h1>

      <ul>
        <li>
          <p>Explore types</p>
          // type X = JSX.Element
        </li>
        <li>
          <p>Play around with React.createElement:</p>
          <code>
            React.createElement('div')
            React.createElement('div',null,React.createElement('div'))
          </code>
        </li>
      </ul>
    </article>
  );
}
