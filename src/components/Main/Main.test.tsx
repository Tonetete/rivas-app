import "regenerator-runtime";
import * as React from "react";
import { create, act } from "react-test-renderer";
import { waitFor } from "@testing-library/react";
import Content from "./Main";

jest.mock("../../services/api", () => ({
  get: async (params) =>
    Promise.resolve({
      columns: ["Column"],
      rows: [
        { value: "11", displayValue: "Value 11" },
        { value: "21", displayValue: "Value 21" },
      ],
    }),
}));

jest.mock("rivas-lib/lib/components/Table", () => {
  return (props) => (
    <table>
      <tr>
        <th>{props.columns[0]}</th>
      </tr>
      <tbody>
        {props.rows.map((item) => (
          <tr>
            <td>{item.displayValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

jest.mock("rivas-lib/lib", () => ({
  ...jest.requireActual("rivas-lib/lib"),
  Dropdown: (props) => (
    <select
      name={props.forLabel}
      onChange={(evt) => props.onChangeCb(evt.currentTarget.value)}
    >
      {props.options.map((option, index) => (
        <option key={`option-${index}`} value={option.value}>
          {option.display}
        </option>
      ))}
    </select>
  ),
}));

const rendererTestComponent = () => create(<Content />);

describe("Dropdown Unit Test", () => {
  it("WHEN render component with data THEN should render dropdown with the data", async () => {
    let Component = null;
    act(() => {
      Component = rendererTestComponent();
    });

    const Dropdown = Component.root.findAllByType("select")[0];
    const getRows = (rootComponent) =>
      rootComponent.findAllByType("tbody")[0].findAllByType("tr");
    const evt = {
      currentTarget: { value: Dropdown.props.children[0].props.value },
    };

    await act(async () => {
      Dropdown.props.onChange(evt);
    });

    await waitFor(() => {
      const Rows = getRows(Component.root);
      expect(Rows[0].children[0].children[0]).toBe("Value 11");
      expect(Rows[1].children[0].children[0]).toBe("Value 21");
    });
  });
});
