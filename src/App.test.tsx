import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const main = "This is the Main";

jest.mock("./components/Main", () => {
  return () => <div id="main">This is the Main</div>;
});

const renderComponent = () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  return div;
};

describe("App Unit Test", () => {
  it("WHEN render component THEN should render main component within", () => {
    const Component = renderComponent();
    const Content = Component.querySelector("#main");

    expect(Component).toBeDefined();
    expect(Content.innerHTML).toBe(main);
  });
});
