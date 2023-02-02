import React, { Children } from "react";

window.React = React;

export function JSXSession() {
  const [count, setCount] = React.useState(-1);

  React.useEffect(() => {
    if (count >= 0) {
      setTimeout(() => setCount((c) => c + 1), 1000);
    }
  }, [count]);

  if (count > 5) {
    throw new Error("snap!");
  }

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
        <li>
          <p>
            <button
              onClick={() => {
                setCount(0);
              }}
            >
              click me: {count <= 0 ? "not yet" : count}
            </button>
          </p>
        </li>
      </ul>
    </article>
  );
}
